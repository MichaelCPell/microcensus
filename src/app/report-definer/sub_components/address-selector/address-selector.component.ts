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

    autocomplete.addListener('place_changed', () => {
      this.researchArea.place = autocomplete.getPlace();
      this.af.tick();
    });
  }


}
