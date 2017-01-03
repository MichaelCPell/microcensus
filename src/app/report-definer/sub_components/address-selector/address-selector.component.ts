import { Component, OnInit } from '@angular/core';
import { ResearchAreaService } from '../../../shared/research-area.service'



@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {
  constructor(private researchArea: ResearchAreaService) {}

  ngOnInit() {
    let element:any = document.getElementById("address")
    let autocomplete = new google.maps.places.Autocomplete(element);

    autocomplete.addListener('place_changed', () => {
      this.researchArea.place = autocomplete.getPlace();
    });
  }
}
