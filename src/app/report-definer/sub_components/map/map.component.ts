import { Component, OnInit, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import * as L from 'leaflet';
var leafletDraw = require('leaflet-draw');
import { Observable } from "rxjs"
import { Store } from '@ngrx/store';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  @Input() reportSpecification$:Observable<any>;
  private marker:L.Marker;
  private shapeLayer:any;
  private map:L.Map;
  private coordinates$:Observable<string[]>
  @Output() polygonDrawn = new EventEmitter<object>();

  constructor(private angulartics:Angulartics2GoogleAnalytics) {
  }

  ngOnInit() {
    this.map = L.map('map').setView([35.7796, -78.6382], 13);    

    this.reportSpecification$
      .map( rs => rs.geoJSON)
      .subscribe( geoJSON => {
      if(geoJSON.geometry.type == "Point"){
        if(geoJSON.geometry.coordinates){
          this.updateMapPoint(geoJSON)
        }
      }

      if(geoJSON.geometry.type == "Polygon"){
        this.updateMapPolygon(geoJSON)
      }
    })

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(this.map);

    this.activateDraw();

    this.map.on(L.Draw.Event.CREATED, (e:any) => {
      if (e.layerType === 'polygon') {
        this.polygonDrawn.emit(e.layer.toGeoJSON());
      }
    });

  }


  private updateMapPoint(geoJSON){
    this.angulartics.eventTrack("Point", {
      category: 'Add Geometry',
    })

    if(this.shapeLayer){
        this.map.removeLayer(this.shapeLayer);
    }
    if(this.marker){
      this.map.removeLayer(this.marker);
    }
    let coordinates = L.latLng(geoJSON.geometry.coordinates[1],geoJSON.geometry.coordinates[0])
    let radius = geoJSON.geometry.radius;
    let view = 13;

    if(radius >= 8000){
      view = 11;
    }else if(radius > 3000){
      view = 12;
    }else if(radius > 1000){
      view = 13;
    }
    this.marker = L.marker(coordinates).addTo(this.map);
    this.shapeLayer = L.circle(coordinates, geoJSON.geometry.radius).addTo(this.map);
    this.map.setView(this.marker.getLatLng(), view);
  }


  private updateMapPolygon(geoJSON){
    this.angulartics.eventTrack("Polygon", {
      category: 'Add Geometry',
    })
    if(this.shapeLayer){
        this.map.removeLayer(this.shapeLayer);
        if(this.marker){
          this.map.removeLayer(this.marker);
        }
    }
    this.shapeLayer = L.geoJSON(geoJSON.geometry).addTo(this.map);
    this.map.fitBounds(this.shapeLayer.getBounds());
  }

  activateDraw(){
    var drawControl = new L.Control.Draw({
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true
            },
            marker: false,
            rectangle: false,
            circle: false,
            polyline: false
        }
    });

    this.map.addControl(drawControl)
  }

}
