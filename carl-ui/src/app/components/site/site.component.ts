import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { Device } from '../../model/device';
import { Site } from '../../model/site';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

    private routeSub: Subscription;

    site: Site = new Site();
    devices: Device[] = [];

  constructor(private route: ActivatedRoute, private service: BackendService) { }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {
          console.log(params);
          this.service.getSite(params['id']).subscribe((site: Site) => {
              console.log(site);
              this.site = site;
          });
          this.service.getDevices(params['id']).subscribe((devices: Device[]) => {
              console.log(devices);
              this.devices = devices;
          });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
