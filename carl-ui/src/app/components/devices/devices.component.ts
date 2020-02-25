import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Site } from '../../model/site';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(private service: BackendService) { }

  ngOnInit() {
      this.service.getSites().subscribe((sites: Site[]) => {
          console.log(sites);
      });
  }

}
