import { Component, OnInit } from '@angular/core';
import { ResearchAreaService } from '../../../shared/research-area.service'

declare var google:any;

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {
  // public map;


  constructor(private researchArea: ResearchAreaService) {
    this.researchArea = researchArea
  }

  ngOnInit() {
    let element:any = document.getElementById("address")
    let autocomplete = new google.maps.places.Autocomplete(element);
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace(autocomplete);
      var latLng = [place.geometry.location.lat(), place.geometry.location.lng()];

      console.log("Flag One")
      this.researchArea.zebra = "Chinchilla";
      // this.map.setCurrentAddress(place.formatted_address  + ", 1 Mile Radius")
      // this.map.addMarker(latLng);
    });
  }

  public test(){
    this.researchArea.zebra = "Guinea Pig"
  }

}
