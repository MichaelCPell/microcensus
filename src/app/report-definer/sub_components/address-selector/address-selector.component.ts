import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {
  @Input() selectedPlace:any;
  @Output() selectedPlaceChange: EventEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {
    let element:any = document.getElementById("address")
    let autocomplete = new google.maps.places.Autocomplete(element);


    debugger

    autocomplete.addListener('place_changed', () => {
      this.selectedPlaceChange.emit(autocomplete.getPlace());
    });
  }
}
