import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {
  @Output() selectedPlace: EventEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {
    let element:any = document.getElementById("address")
    let autocomplete = new google.maps.places.Autocomplete(element);

    autocomplete.addListener('place_changed', () => {
      this.selectedPlace.emit(autocomplete.getPlace());
    });
  }
}
