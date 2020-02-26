import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    interval: any;

  constructor(public service: BackendService) { }

  ngOnInit() {
      this.interval = setInterval(() => {
          const value = Math.random();
          if(value < 0.33) return;
          const row = this.getRndInteger(0, 6);
          const col = this.getRndInteger(0, 10);
          if(this.service.heatData[row][col] >= 0.33) this.service.heatData[row][col] = value;
      }, 1000);
  }

  getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

  ngOnDestroy() {
      clearInterval(this.interval);
  }

}
