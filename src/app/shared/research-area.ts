

export class ResearchArea {
  public _geoJSON:any;
  public _type:string;
  public _place:object;
  public lat;
  public lng;


  constructor(type:string, geoJSON?:object, place?:object,){
    this._type = type;
    this._geoJSON = geoJSON;
    this._place = place;

    if(this.type == "point"){
      this._radius = place.radius;
      this.lat = this._place.geometry.location.lat()
      this.lng = this._place.geometry.location.lng()
    }else{

    }
  }


  get type(){
    return this._type
  }

  get coordinates(){
    return [this.lat, this.lng];
  }

  get geoJSON(){
    return this._geoJSON;
  }

  set geoJSON(object){
    this._geoJSON = object;
  }

  set radius(value){
    this._radius = value
  }

  get radius(){
    return this._radius
  }

  get radiusInMeters(){
    return this.radius * 1609.344
  }
}
