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
    }

}
