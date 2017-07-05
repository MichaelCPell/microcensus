import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Location } from '../../../models/location';
import { GeoJSONFeature } from "../../../models/geoJSON-feature";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  @Input() locations:Location[];
  @Input() filterQuery:string;
  @Output() setReportSpecification = new EventEmitter<GeoJSONFeature>();

  constructor() { }

  ngOnInit() {
  }

  setReportSpecificationTo(location){
    this.setReportSpecification.emit(location)
  }
}
