import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Site } from '../model/site';
import { Device } from '../model/device';
import { Sensor } from '../model/sensor';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }

    getSites() {
        return this.http.get<Site[]>(environment.sites);
    }

    getDevices(siteId: string) {
        return this.http.get<Device[]>(environment.devices + siteId);
    }

    getSensors(deviceId: string) {
        return this.http.get<Sensor[]>(environment.sensors + deviceId);
    }


}
