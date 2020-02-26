import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    heatData: number[][] = [
        [1.0,1.0,1.0,1.0,1.0, 1.0,0.8,0.8,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,1.0,1.0,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 0.5,0.22,1.0,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,0.12,1.0,1.0,1.0],
        [0.67,1.0,1.0,0.5,1.0, 1.0,0.33,0.55,1.0,0.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,1.0,1.0,1.0,1.0],
        [1.0,1.0,1.0,1.0,1.0, 1.0,1.0,1.0,1.0,1.0]
    ];

    interval: any;

  constructor() { }

  ngOnInit() {
      this.interval = setInterval(() => {
          const value = Math.random();
          if(value < 0.33) return;
          const row = this.getRndInteger(0, 6);
          const col = this.getRndInteger(0, 10);
          if(this.heatData[row][col] >= 0.33) this.heatData[row][col] = value;
      }, 1000);
  }

  getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

  ngOnDestroy() {
      clearInterval(this.invteral);
  }

}
