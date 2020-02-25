import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    map: any;

    zoom: number = 10;
    lat: number = 51.0504088;
    lng: number = 13.7372621;

    constructor() { }

    ngOnInit() {
        this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([13.7372621, 51.0504088]),
        zoom: 12
      })
    });
    }

}
