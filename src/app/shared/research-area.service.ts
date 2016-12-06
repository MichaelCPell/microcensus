import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ResearchAreaService {
  private _zebra:string = "Consistency"


  private geoJSONfragment = {
    "geometry": {"type":"Point","coordinates":[-79.52313700000002,36.09550000000001]},
    "reportName": "PopulationCount2000"
  };

  constructor() {}



  get zebra(){
    return this._zebra
  }

  set zebra(value){
    console.log("Setter was called");
    this._zebra = value;
  }

  // public set(object){
  //   console.log("Set is being called");
  //   console.log(this.zebra)
  //   this.zebra = "Gazelle"
  //   // this.geoJSONfragment = object;
  //   console.log(this.zebra)
  //
  //   return true
  // }
  //
  // public

}
