import { Component, OnInit } from '@angular/core';
import { Device } from '../../model/device';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

    private routeSub: Subscription;

    device: Device = new Device();

  constructor(private route: ActivatedRoute, private service: BackendService) { }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {
          console.log(params);
          this.service.getDevice(params['id']).subscribe((device: Device) => {
              console.log(device);
              this.device = device;
          });
          /*this.service.getSensors(params['id']).subscribe((sensors: Sensors[]) => {
              console.log(sensors);
              this.sensors = sensors;
          });*/
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
