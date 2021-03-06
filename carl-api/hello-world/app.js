const AWS = require('aws-sdk');
const s3 = new AWS.S3();

let realData = null;

// init code, run whenever the lambda is loaded
async function init() {
    return new Promise((resolve, reject) => {
        // read latest real data from s3
        s3.getObject({
            Bucket: 'team-one-carl-data',
            Key: 'data.json'
        }, function (err, data) {
            if (err) {
                console.error("Failed to read data from S3!", err);
                reject(err)
            }
            console.log("got real data from s3: ", data.Body.toString())
            realData = JSON.parse(data.Body.toString());
            resolve();
        });
    });
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    if (!realData) {
        if (!context.test) {
            try {
                await init();
            } catch(e) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        msg: "Failed to inti \"database connection\".",
                        reason: e
                    })
                }
            }
        } else {
            realData = [{
                "udtConnectionPoint.System.Parameter.NameOfStation": "TestStation",
                "udtConnectionPoint.PumpControl": {
                    Pumps: []
                },
                "udtConnectionPoint.System": {
                    Parameter: {
                        NameOfStation: ""
                    }
                },
                "udtConnectionPoint.Measurement": [
                    {
                        Diagnostic: {
                            RawValue_Percent: 32.2
                        }
                    }
                ]
            }];
        }
    }
    console.log("Request: ", { path: event.path, params: event.queryStringParameters });
    let responseData;
    event.queryStringParameters = event.queryStringParameters || {}
    let { site, device, sensor } = event.queryStringParameters
    switch (event.path) {
        case '/sites': responseData = getSites(site); break;
        case '/devices': responseData = getDevices(site, device); break;
        case '/sensors': responseData = getSensors(device, sensor); break;
        case '/ingest': responseData = await postData(event.body, context.test); break;
        default: responseData = {
            statusCode: 404,
            body: 'Unknown endpoint.'
        }
    }
    if (responseData && responseData.statusCode) {
        return responseData;
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify(responseData),
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        }
    }
};

function getSites(site) {
    let sites = {
        '007': {
            id: '007',
            status: 'OK',
            position: { lon: 51.271298, lat: 13.803302 },
            address: 'Kritzenhof, Hauptstraße 3',
            name: 'Kritzendorf',
            type: 'PumpHouse',
            fillLevel: 42,
            devices: [
                { status: 'OFF' },
                { status: 'OK' }
            ]
        },
        '008': {
            id: '008',
            status: 'WARNING',
            position: { lon: 51.241298, lat: 13.823302 },
            address: 'Wasserhan-Miedenhain, Am Werk 1a',
            name: 'Dresden 2',
            type: 'Storage',
            fillLevel: 23,
            devices: [
                { status: 'OK' },
                { status: 'WARNING' },
                { status: 'OFF' },
                { status: 'OK' }
            ]
        },
        '009-09123-123-1231345': {
            id: '009-09123-123-1231345',
            status: 'FAULTY',
            position: { lon: 51.241298, lat: 13.823302 },
            address: 'Wasserhan-Miedenhain, Am Werk 1b',
            name: 'Leipzig',
            type: 'Storage',
            fillLevel: 78,
            devices: [
                { status: 'OK' },
                { status: 'FAULTY' },
                { status: 'OK' }
            ]
        }
    }

    // add latest "real" data
    //let fillLevelMax = realData['udtConnectionPoint.Measurement'][0].Diagnostic.GreatestValue
    //let fillLevelCurrent = realData['udtConnectionPoint.Measurement'][0].ProcessValue
    realData.forEach((realSiteData, i) => {
    
        let deviceList = []
        realSiteData['udtConnectionPoint.PumpControl'].Pumps.forEach(element => {
            // default state is WARNING
            let status = 'WARNING'

            if (element.Error == true) {
                status = 'FAULTY'
            } else if (element.Error == false && element.Warning == false && element.Ready == true) {
                status = 'OK'
            } else if (element.Error == false && element.Running == false && element.Ready == true) {
                status = 'OFF'
            }

            deviceList.push({ status })
        });

        sites['real' + i] = {
            id: 'real',
            status: 'FAULTY',
            position: { lon: 51.082622, lat: 13.725815 },
            address: 'Dresden, Riesaer Str. 5',
            name: realSiteData['udtConnectionPoint.System'].Parameter.NameOfStation,
            type: 'PumpHouse',
            fillLevel: Math.floor(realSiteData['udtConnectionPoint.Measurement'][0].Diagnostic.RawValue_Percent),
            //pumpCount: realSiteData['udtConnectionPoint.System'].Parameter.NumberOfPumps
            devices: deviceList
        }
    });

    if (site) {
        return sites[site]
    } else {
        return toArray(sites);
    }
}

function getDevices(site, device) {
    let devices = {};
    devices[site + '-001'] = {
        siteId: site,
        deviceId: site + '-001',
        status: 'OK',
        active: true,
        type: 'LEWA Membrandosierpumpe',
        alerts: [],
        maintenance: {
            lastMaintained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40),
            nextMaintanance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
        },
        name: 'Zulaufpumpe 1',
    };
    devices[site + '-002'] = {
        siteId: site,
        deviceId: site + '-002',
        status: 'OFF',
        active: false,
        type: 'LEWA Membrandosierpumpe',
        alerts: [],
        maintenance: {
            lastMaintained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 36),
            nextMaintanance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        },
        name: 'Zulaufpumpe 1 (Ersatz)',
    };
    devices[site + '-003'] = {
        siteId: site,
        deviceId: site + '-003',
        status: 'OK',
        active: false,
        type: 'LEWA Membrandosierpumpe',
        alerts: [
            {
                type: 'WARNING',
                msg: 'Wartung fällig.'
            }
        ],
        maintenance: {
            lastMaintained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200),
            nextMaintanance: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
        },
        name: 'Zulaufpumpe 2',
    };
    devices[site + '-004'] = {
        siteId: site,
        deviceId: site + '-004',
        status: 'FAULTY',
        active: false,
        type: 'LEWA Membrandosierpumpe',
        alerts: [
            {
                type: 'FAULTY',
                msg: 'Pumpe reagiert nicht!'
            }
        ],
        maintenance: {
            lastMaintained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200),
            nextMaintanance: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
        },
        name: 'Zulaufpumpe 3',
    };
    if (device) {
        return devices[device];
    } else {
        return toArray(devices);
    }
}

function getSensors(device, sensor) {
    let sensors = {}
    let history1 = [];
    let history2 = [];
    for (var i = 0; i < 100; i++) {
        history1.push(Math.random());
        history2.push(Math.random() * 1000);
    }
    sensors[device + '-001'] = {
        currentValue: Math.random(),
        history: history1,
        unit: 'm³/s'
    };
    sensors[device + '-002'] = {
        currentValue: Math.random(),
        history: history2,
        unit: 'pound/inch²'
    }
    if (sensor) {
        return sensors[sensor];
    } else {
        return toArray(sensors);
    }
}

async function postData(data, test) {
    console.log("Retrieved Data", data)
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    // (de)? normalize data
    parsedData = []
    data.forEach((stationData) => {
        let innerParsedData = {}
        stationData.forEach((entry) => {
            innerParsedData[entry.path] = entry.value;
        });
        parsedData.push(innerParsedData)
    });
    console.log("Parsed Data", parsedData)

    if (test) {
        return {
            ack: true
        };
    }
    // append new data
    realData = parsedData;

    return new Promise((resolve, reject) => {
        // store data in S3 bucket.
        s3.putObject({
            Bucket: 'team-one-carl-data',
            Key: 'data.json',
            Body: JSON.stringify(realData)
        }, function (err, response) {
            if (err) {
                console.error("Failed to save data in s3!", err);
                resolve({
                    statusCode: 500,
                    body: {
                        msg: "Failed to save data in s3!",
                        reason: err
                    }
                });
            } else {
                resolve({
                    ack: true
                });
            }
        })
    });
}

function toArray(obj) {
    let arr = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(obj[key]);
        }
    }
    return arr;
}
