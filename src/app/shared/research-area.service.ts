import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class ResearchAreaService {
  private _place:any;
  private _observable:any;
  public placeObsv:Observable<any>;
  private geoJSONfragment = {
    "geometry": {"type":"Point","coordinates":[-79.52313700000002,36.09550000000001]},
    "reportName": "PopulationCount2000"
  };

  constructor() {

    let myObsv = new Observable(observer => {
      (this._observable = observer);
    })
    this.placeObsv = myObsv.share();
  }

  get coordinates(){
    if(this._place){
      return [this._place.geometry.location.lng(), this._place.geometry.location.lat()];
    }
  }

  set place(value:any){
    this._place = value;
    this._observable.next(this.coordinates);
  }

  get place(){
    return this._place
  }

  //
  // public foo:Observable = new Observable( observer => {
  //   this._place = observer).share()

  // public bar:Observable = Observable.create( observer => {
  //   observer.next(42);
  //   observer.complete();
  //
  //   return () => console.log('disposed');
  // })
}
