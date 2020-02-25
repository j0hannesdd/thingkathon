import sys
sys.path.append('modules')

import requests
import json

# disable urllib warnings
#   https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings
import urllib3
urllib3.disable_warnings()

import sched, time


BASE_URL_PLC = 'https://172.17.16.5/_pxc_api/api'

# global scheduler for keep_alive events
keep_alive_scheduler = sched.scheduler(time.time, time.sleep)


def setup_session():
    session = requests.Session()
    session.verify = False

    stationData = "stationID=42"

    # init session
    r = session.post('{base_url}/sessions'.format(base_url=BASE_URL_PLC), data=stationData)

    sessionID = r.json()['sessionID']

    return session, sessionID

def keep_alive(session, sessionID):
    
    # keep session alive
    print('keep alive..')
    r = session.post('{base_url}/sessions/{sessionID}'.format(base_url=BASE_URL_PLC, sessionID=sessionID))
    #print(r.text)
    keep_alive_scheduler.enter(2, 1, keep_alive, argument=(session, sessionID))
    keep_alive_scheduler.run(False)


def create_data_group(session, sessionID):
    # create group
    groupData = {
            "pathPrefix": "Arp.Plc.Eclr/",
            "paths": [
                    #"udtConnectionPoint.System.Parameter.NameOfStation",
                    #"udtConnectionPoint.System.Parameter.NumberOfPumps",
                    #"udtConnectionPoint.System.Parameter.NumberOfStages",
                    #"udtConnectionPoint.System.Parameter.ControlScheme",
                    #"udtConnectionPoint.System.Diagnostic.SysTick",
                    #"udtConnectionPoint.System.Diagnostic.StationDate",
                    #"udtConnectionPoint.System.Diagnostic.StationTime",
                    #"udtConnectionPoint.System.Diagnostic.Uptime",
                    #"udtConnectionPoint.System.Diagnostic.ComissiningDate",
                    "udtConnectionPoint.System",
                    "udtConnectionPoint.Measurement",
                    "udtConnectionPoint.LevelControl",
                    "udtConnectionPoint.PumpControl"

            ],
            "sessionID": sessionID
    }
    r = session.post('{base_url}/groups/'.format(base_url=BASE_URL_PLC), data=json.dumps(groupData))
    groupID = r.json()['id']
    #print(r.text)

    return groupID


import pprint

def get_data_group(session, sessionID, groupID):
    print(sessionID)
    # use group to get data
    r = session.get('{base_url}/groups/{groupID}/?sessionID={sessionID}'.format(
        base_url=BASE_URL_PLC, 
        groupID=groupID, 
        sessionID=sessionID))
    #print(r.text)

    pprint.pprint(r.json())

    return r.json()['variables']


######## go for it! ########
#while 1:
session, sessionID = setup_session()
keep_alive(session, sessionID)
groupID = create_data_group(session, sessionID)
while 1:
    plcData = get_data_group(session, sessionID, groupID)
    pprint.pprint(plcData)
    # push data to aws
    r = requests.post('https://hcazi6f033.execute-api.eu-central-1.amazonaws.com/Prod/ingest', data=json.dumps(plcData))
    print('{} -- {}'.format(r, r.text))
    time.sleep(5)

