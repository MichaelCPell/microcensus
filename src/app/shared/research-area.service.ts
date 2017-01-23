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

  public create(args){
    this.researchArea = new ResearchArea(args)

    if(!this.researchArea.radius){
      this.researchArea.radius = this._radius.getValue()
    }
    this.mappable.next(this.researchArea);
  }

  public set(location){
    this.researchArea = new ResearchArea(location)

    if(!this.researchArea.radius){
      this.researchArea.radius = this._radius.getValue()
    }

    this.mappable.next(this.researchArea);
  }

  set radius(value){
    if(this.researchArea){
      this.researchArea.radius = value;
      this.mappable.next(this.researchArea);
    }
  }

  get name(){
    return this.researchArea.name
  }

  get radius(){
    return this.researchArea.radius
  }

  get geoJSON(){
    return this.researchArea.geoJSON;
  }
}
