import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
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


    this.researchArea.mapSelection.subscribe(
      data => {
        let place = this.researchArea.place.getValue();
        let radius = this.researchArea.radiusInMeters;
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



        if(place.lat){
          if(this.shapeLayer){
            this.map.removeLayer(this.shapeLayer);
            this.map.removeLayer(this.marker);
          }


          this.marker = L.marker([place.lat, place.lng]).addTo(this.map);
          this.shapeLayer = L.circle([place.lat, place.lng], radius).addTo(this.map);
          this.map.setView(this.marker.getLatLng(), view);
        }
      },
      error => {
        console.log(error)
      }
    )

  }

}
