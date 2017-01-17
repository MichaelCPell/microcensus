import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/merge';

@Injectable()
export class ResearchAreaService {
  private _radius:BehaviorSubject<number> = new BehaviorSubject(1);
  private _place:BehaviorSubject<object> = new BehaviorSubject({});
  private geoJSONfragment = {
    "geometry": {"type":"Point","coordinates":[-79.52313700000002,36.09550000000001]},
    "reportName": "PopulationCount2000"
  };

  constructor() {}


  get coordinates(){
    return [this.place.getValue().lng, this.place.getValue().lat];

  }

  set place(place:any){
    if(!place.lat){
      place.lat = place.geometry.location.lat();
      place.lng = place.geometry.location.lng();
    }
    this._place.next(place)
  }

  get place(){
    return this._place
  }

  get mapSelection(){
    var place = this._place;
    var radius = this._radius;
    return place.merge(radius);
  }

  get radius(){
    return this._radius
  }

  get radiusInMeters(){
    return this._radius.getValue() * 1609.344
  }

  set radius(value){
    this._radius.next(value)
  }
}
