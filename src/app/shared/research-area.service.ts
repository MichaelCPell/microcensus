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
  public mappable:BehaviorSubject<ResearchArea> = new BehaviorSubject({});
  private researchArea:ResearchArea = new ResearchArea();

  constructor() {}

  set place(args){
    this.researchArea = new ResearchArea(args)

    if(!this.researchArea.radius){
      this.researchArea.radius = this._radius.getValue()
    }

    console.log("Flag Two")
    this.mappable.next(this.researchArea);
  }

  get radius(){
    return this.researchArea.radius
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



  get geoJSON(){
    return this.researchArea.geoJSON;
  }
}
