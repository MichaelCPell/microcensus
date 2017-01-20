import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { ResearchArea } from "./research-area";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/merge';
import * as L from 'leaflet';

@Injectable()
export class ResearchAreaService {
  private _radius:BehaviorSubject<number> = new BehaviorSubject(1);
  private _place:BehaviorSubject<object> = new BehaviorSubject({});
  private _geoJSON:any;
  public mappable:BehaviorSubject<object> = new BehaviorSubject({});


  constructor() {}



  public create(type:string, geoJSON:object, data:object){
    if(type == "point"){
      this.researchArea = new ResearchArea(type, geoJSON, data)
    }else{

      let data = {
        center: L.geoJSON(geoJSON).getBounds().getCenter()
      }

      this.researchArea = new ResearchArea(type, geoJSON, data)

    }
    this.mappable.next(this.researchArea);
  }



  //
  // set place(place:any){
  //   if(!place.lat){
  //     place.lat = place.geometry.location.lat();
  //     place.lng = place.geometry.location.lng();
  //   }
  //   this._place.next(place)
  // }
  //
  // get place(){
  //   return this._place
  // }
  //



  //
  set radius(value){
    if(this.researchArea){
      this.researchArea.radius = value;
      this.mappable.next(this.researchArea);
    }
  }
  //
  //
  // public processGeoJSON(geoJSON){
  //   this._geoJSON = L.geoJSON(geoJSON)
  //
  //   debugger
  //
  // }
}
