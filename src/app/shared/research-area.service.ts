import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ResearchAreaService {
  private _place:any;
  private geoJSONfragment = {
    "geometry": {"type":"Point","coordinates":[-79.52313700000002,36.09550000000001]},
    "reportName": "PopulationCount2000"
  };

  constructor() {}

  get coordinates(){
    if(this._place){
      return [this._place.geometry.location.lng(), this._place.geometry.location.lat()];
    }
  }

  set place(value:any){
    this._place = value;
  }
}
