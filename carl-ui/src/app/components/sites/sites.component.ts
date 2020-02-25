import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Site } from '../../model/site';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

    sites: Site[] = [];

  constructor(private service: BackendService) { }

  ngOnInit() {
      this.service.getSites().subscribe((sites: Site[]) => {
          this.sites = sites;
          console.log(sites);
      });
  }

}
