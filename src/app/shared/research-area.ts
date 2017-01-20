

export class ResearchArea {
  public _geoJSON:any;
  public _type:string;
  public _place:object;
  public lat;
  public lng;


  constructor(type:string, geoJSON?:object, place?:object,){
    this._type = type;

    this._place = place;

    if(this.type == "point"){
      this._radius = place.radius;
      this.lat = this._place.geometry.location.lat()
      this.lng = this._place.geometry.location.lng()

      this._geoJSON = {
          "type": "Point",
          "coordinates": [
              this.lng,
              this.lat
          ],
          "radius" : this.radiusInMeters
      }

    }else{
      this._geoJSON = geoJSON;
    }
  }


  get type(){
    return this._type
  }

  get name(){
    if(this.type == "point"){
      return this._place.formatted_address
    }
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
