import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ResearchAreaService } from '../../../shared/research-area.service'



@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {
  // public map;


  constructor(private researchArea: ResearchAreaService, private af: ApplicationRef) {
    this.researchArea = researchArea
  }

  ngOnInit() {
    let element:any = document.getElementById("address")
    let autocomplete = new google.maps.places.Autocomplete(element);


    console.log(google)
    // let autocomplete = new g

    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace(autocomplete);
      var latLng = [place.geometry.location.lat(), place.geometry.location.lng()];

      console.log("Flag One")
      this.researchArea.zebra = "Chinchilla";
      this.af.tick();
      // this.map.setCurrentAddress(place.formatted_address  + ", 1 Mile Radius")
      // this.map.addMarker(latLng);
    });
  }

  public test(){
    this.researchArea.zebra = "Guinea Pig"
  }

}
