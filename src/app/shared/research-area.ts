

export class ResearchArea {
  public _geoJSON:any;
  public _type:string;
  public _place:object;
  public lat;
  public lng;


  constructor(args){
    Object.keys(args).forEach( key => {
      this[key] = args[key]
    })

    this.afterInit();
  }

  private afterInit(){
    if(this.type == "point"){
      this._radius = 1;
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


  get createdAt(){
    return this._createdAt
  }

  set createdAt(value){
    this._createdAt = value;
  }

  get lat(){
    return this._lat;
  }

  set lat(value){
    this._lat = value;
  }


  get lng(){
    return this._lng;
  }

  set lng(value){
    this._lng = value;
  }


  get name(){
    if(this.type == "point"){
      return this._place.formatted_address
    }
  }

  set name(value){
    this._name = value
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

  get place(){
    return this._place;
  }

  set place(value){
    this._place = value;
  }


  get radius(){
    return this._radius
  }

  get radiusInMeters(){
    return this.radius * 1609.344
  }

  set radius(value){
    this._radius = value
  }

  get reports(){
    return this._reports
  }

  set reports(value){
    this._reports = value
  }

  get type(){
    return this._type
  }

  set type(value){
    this._type = value
  }

}
