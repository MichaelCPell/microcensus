import { Component, OnInit, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import * as L from 'leaflet';
var leafletDraw = require('leaflet-draw');
import { Observable } from "rxjs"
import { Store } from '@ngrx/store'

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

  constructor() {
  }

  ngOnInit() {
    this.map = L.map('map').setView([35.7796, -78.6382], 13);    

    this.reportSpecification$.subscribe( rs => {
      if(rs.geoJSON.geometry.coordinates){
        this.updateMapPoint(rs)
      }
    })

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(this.map);




    // this.researchArea.mappable.subscribe(
    //   ra => {
    //     if(this.shapeLayer){
    //       this.map.removeLayer(this.shapeLayer);
    //     }
    //     if(this.marker){
    //       this.map.removeLayer(this.marker);
    //     }
    //     if(ra.type == "point"){
    //       let radius = ra.radius;
    //       let view = 13;

    //       if(radius > 15000){
    //         view = 10;
    //       }else if(radius > 8000){
    //         view = 11;
    //       }else if(radius > 3000){
    //         view = 12;
    //       }else if(radius > 1000){
    //         view = 13;
    //       }
    //       this.marker = L.marker(ra.coordinates).addTo(this.map);
    //       this.shapeLayer = L.circle(ra.coordinates, radius).addTo(this.map);
    //       this.map.setView(this.marker.getLatLng(), view);
    //     }else if(ra.type == "polygon" || ra.type == "Polygon"){
    //       this.shapeLayer = L.geoJSON(ra.geometry).addTo(this.map);
    //       this.map.fitBounds(this.shapeLayer.getBounds());
    //     }
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )

    this.activateDraw();

    this.map.on(L.Draw.Event.CREATED, (e:any) => {
      if (e.layerType === 'polygon') {
        this.polygonDrawn.emit(e.layer.toGeoJSON());
      }
    });

  }


  private updateMapPoint(rs){
    if(this.shapeLayer){
        this.map.removeLayer(this.shapeLayer);
    }
    let coordinates = L.latLng(rs.geoJSON.geometry.coordinates[1],rs.geoJSON.geometry.coordinates[0])
    let radius = rs.geoJSON.geometry.radius;
    let view = 13;

    if(radius >= 8000){
      view = 11;
    }else if(radius > 3000){
      view = 12;
    }else if(radius > 1000){
      view = 13;
    }
    this.marker = L.marker(coordinates).addTo(this.map);
    this.shapeLayer = L.circle(coordinates, rs.geoJSON.geometry.radius).addTo(this.map);
    this.map.setView(this.marker.getLatLng(), view);

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
