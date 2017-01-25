import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {
  @Input() activePlace:any;
  @Output() activePlaceChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    let element:any = document.getElementById("address")
    let autocomplete = new google.maps.places.Autocomplete(element);

    autocomplete.addListener('place_changed', () => {
      this.activePlaceChange.emit(autocomplete.getPlace());
    });

    if(this.activePlace.address){
      element.value = this.activePlace.address
    }
  }
}
