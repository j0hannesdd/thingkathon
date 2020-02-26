import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    map: any;

    /*zoom: number = 12;
    lat: number = 51.0504088;
    lng: number = 13.7372621;*/

    vectorSource = new ol.source.Vector({});

    constructor() { }

    ngOnInit() {
        const style = {
			'Point' : new ol.style.Style({
				image : new ol.style.Circle({
					fill : new ol.style.Fill({
						color : '#0084CA'
					}),
					radius : 9,
					stroke : new ol.style.Stroke({
						color : '#fff',
						width : 2
					})
				})
			}),
			'LineString' : new ol.style.Style({
				stroke : new ol.style.Stroke({
					color : '#f00',
					width : 3
				})
			}),
			'MultiLineString' : new ol.style.Style({
				stroke : new ol.style.Stroke({
					color : '#0f0',
					width : 3
				})
			})
		};

        const vector = new ol.layer.Vector({
			source: this.vectorSource,
			style: function(feature) {
				return style[feature.getGeometry().getType()];
			}
		});

        this.map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({source: new ol.source.OSM()}),
            vector
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([13.7258842, 51.0825532]),
            zoom: 12
          })
        });

        this.addLocation(13.7258842, 51.0825532);
    }

    addLocation(lon, lat) {
        const l0 = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
			name: 'My Location'
		});
		this.vectorSource.addFeature(l0);
    }

}
