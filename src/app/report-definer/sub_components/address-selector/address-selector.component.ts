import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    let autocomplete = new google.maps.places.Autocomplete(element);
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace(autocomplete);
      var latLng = [place.geometry.location.lat(), place.geometry.location.lng()];
      this.map.setCurrentAddress(place.formatted_address  + ", 1 Mile Radius")
      this.map.addMarker(latLng);
    });

  }

}
