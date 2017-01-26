import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { ResearchArea } from "./research-area";
import { DynamoDBService } from "./ddb.service";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/merge';
import * as L from 'leaflet';

@Injectable()
export class ResearchAreaService {
  // Single Responsibility - Take care of knowing what area the user is currently interested in.
  private _radius = 1;
  private _place:BehaviorSubject<any> = new BehaviorSubject({});
  private _geoJSON:any;
  public mappable:BehaviorSubject<any> = new BehaviorSubject({});
  private _researchArea:ResearchArea = new ResearchArea();

  constructor(private ddb:DynamoDBService) {}

  set place(value){
    // came in from Address Selector
    this.researchArea = new ResearchArea();
    this.researchArea.createdAt = Date.now();
    this.researchArea.place = value;
    this.researchArea.geometry = {
          "type": "Point",
          "coordinates": [
              value.geometry.location.lng(),
              value.geometry.location.lat()
          ]
    };
    this.researchArea.name = value.formatted_address;
    this.researchArea.type = "point";

    this.mappableEvent();
  }

  set shape(value){
    // came in from File Uploader
    this.researchArea = new ResearchArea();
    this.researchArea.createdAt = Date.now();
    this.researchArea.geometry = value.geometry;
    this.researchArea.name = "Research Triangle"
    this.researchArea.type = "polygon";

    this.mappableEvent();
  }

  get researchArea(){
    return this._researchArea;
  }

  set researchArea(value){
    this._researchArea = value
  }

  set reportType(value){}


  get radiusInMeters(){
    return this.radius * 1609.344
  }

  get radius(){
    return this._radius;
  }

  set radius(value){
    this._radius = value

    this.mappableEvent();
  }

  get coordinates(){
    if(this.researchArea.type == "point"){
      let latLng = this.researchArea.geometry.coordinates
      return [latLng[1], latLng[0]] 
    }
  }

// Public Methods
storeLocation(email:string){
  this.ddb.addLocation(this.researchArea, email);
}


// Private Methods

  private mappableEvent(){
    this.mappable.next({
      geometry: this.researchArea.geometry,
      radius: this.radiusInMeters,
      coordinates: this.coordinates,
      type: this.researchArea.type
    });
  }
}
