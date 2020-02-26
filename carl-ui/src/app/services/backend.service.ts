import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Site } from '../model/site';
import { Device } from '../model/device';
import { Sensor } from '../model/sensor';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

    heatData: number[][] = [
        [1.0,1.0,1.0,1.0,1.0, 1.0,0.8,0.8,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,1.0,1.0,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 0.5,0.22,1.0,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,0.12,1.0,1.0,1.0],
        [0.67,1.0,1.0,0.5,1.0, 1.0,0.33,0.55,1.0,0.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,1.0,1.0,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,1.0,1.0,1.0,1.0]
    ];

    tasks: Task[] = [];

    constructor(private http: HttpClient) { }

    getSites() {
        return this.http.get<Site[]>(environment.sites);
    }

    getSite(id: string) {
        return this.http.get<Site>(environment.sites + '?site=' + id);
    }

    getDevices(siteId: string) {
        return this.http.get<Device[]>(environment.devices + '?site=' + siteId);
    }

    getDevice(id: string) {
        const siteId = id.substring(0, id.lastIndexOf('-'));
        return this.http.get<Device>(environment.devices + '?site=' + siteId + '&device=' + id);
    }

    getSensors(deviceId: string) {
        return this.http.get<Sensor[]>(environment.sensors + deviceId);
    }

    createEvent() {
        console.log('create event');
        const a = new Task();
        a.id='0001';
        a.name = 'Störung';
        a.type = 'Erhöhte Temperatur';
        this.tasks.push(a);
        let fin = false;
        for(let r=0; r<7 && fin===false; r++) {
            for(let c=0; c<10 && fin===false; c++){
                if(this.heatData[r][c]>0.66) {
                    this.heatData[r][c] = 0.0;
                    fin = true;
                }
            }
        }
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

}
