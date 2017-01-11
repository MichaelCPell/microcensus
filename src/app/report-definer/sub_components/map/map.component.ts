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

  constructor(private researchArea: ResearchAreaService) {
    this.researchArea = researchArea;
  }

  ngOnInit() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    this.researchArea.place.subscribe(
      (place) => {
        if(place.lat){
          this.marker = L.marker([place.lat, place.lng]).addTo(map);
          L.circle([place.lat, place.lng], 1609).addTo(map);
          map.setView(this.marker.getLatLng(), 14);
        }
      },
      e => console.log('onError: %s', e),
      () => console.log('onCompleted')
    );

    //
    // this.researchArea.foo.subscribe(
    //   next => console.log(next)
    // )

  }

}
