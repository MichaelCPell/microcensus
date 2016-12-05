import { Injectable } from '@angular/core';

@Injectable()
export class ResearchAreaService {

  private geoJSONfragment = {
    "geometry": {"type":"Point","coordinates":[-79.52313700000002,36.09550000000001]},
    "reportName": "PopulationCount2000"
  };

  constructor() {
  }

  public get(){
    return this.geoJSONfragment;
  }

  public set(object){
    return this.geoJSONfragment = object;
  }

}
