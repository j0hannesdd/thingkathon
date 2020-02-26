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

  constructor() { }

  ngOnInit() {
  }

}
