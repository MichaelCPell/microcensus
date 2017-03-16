import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
var leafletDraw = require('leaflet-draw');
import {ResearchAreaService} from "../../../shared/research-area.service";
import {Subscriber} from "rxjs/Subscriber"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private marker:L.Marker;
  private shapeLayer:any;
  private map:L.Map;

  constructor(private researchArea: ResearchAreaService) {
    this.researchArea = researchArea;
  }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.researchArea.mappable.subscribe(
      ra => {
        if(this.shapeLayer){
          this.map.removeLayer(this.shapeLayer);
        }
        if(this.marker){
          this.map.removeLayer(this.marker);
        }
        if(ra.type == "point"){
          let radius = ra.radius;
          let view = 13;

          if(radius > 15000){
            view = 10;
          }else if(radius > 8000){
            view = 11;
          }else if(radius > 3000){
            view = 12;
          }else if(radius > 1000){
            view = 13;
          }
          this.marker = L.marker(ra.coordinates).addTo(this.map);
          this.shapeLayer = L.circle(ra.coordinates, radius).addTo(this.map);
          this.map.setView(this.marker.getLatLng(), view);
        }else if(ra.type == "polygon" || ra.type == "Polygon"){
          this.shapeLayer = L.geoJSON(ra.geometry).addTo(this.map);
          this.map.fitBounds(this.shapeLayer.getBounds());
        }
      },
      error => {
        console.log(error)
      }
    )

    this.activateDraw();

    this.map.on(L.Draw.Event.CREATED, (e) => {
      if (e.layerType === 'polygon') {
        this.researchArea.shape = e.layer.toGeoJSON();      
      }
    });

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
