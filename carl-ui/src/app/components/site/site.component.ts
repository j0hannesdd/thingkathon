import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { Device } from '../../model/device';
import { Site } from '../../model/site';
import Chart from 'chart.js';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  private routeSub: Subscription;

  site: Site = new Site();
  devices: Device[] = [];

  @ViewChild('heightChart', { static: true }) heightChart: ElementRef;

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

  ngAfterViewInit() {
    let context = this.heightChart.nativeElement.getContext('2d');
    let data = [];
    let labels = [];
    let days = ["Mo", "Di","Mi","Do","Fr", "Sa", "So"]
    for(var i=0;i<(7*5);i++) {
      let value = i==0?(Math.random()*100):(data[i-1]+(0.5-Math.random())*20)
      data.push(value);
      labels.push(days[i/5]);
    }
    // console.log("data:", data)
    data = [41.903570251306796,33.970932393789475,39.1469264636219,29.928380784368663,30.453381263852904,23.665242248362198,29.361980043383525,34.50006413933838,44.204153631322285,42.098752686310306,33.08804976643836,33.289801396752935,26.903323774387133,34.892000426077175,42.1271731752948,49.53584171804601,46.60246598130594,39.984069265237466,47.17571611364916,45.333854693069966,52.54758524840327,60.726131609401364,69.06945252618468,76.12403033947909,73.92463175251817,81.20705417899994,88.39524993574184,86.58042931060135,83.2747196062566,85.68591027693734,79.07485588709848,70.75887798110757,75.24302640869527,76.68671328231864,74.56368831774145];
    let chart = new Chart(context, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "x",
          data: data,
          borderColor: "rgba(240,240,240, 1)"
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 7
            }
          }]
         },
         elements: {
          point:{
              radius: 0
          }
      }
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
