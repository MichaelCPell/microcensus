export class ResearchArea {
  // Single Responsibility: Maintain the data that gets stored by a user to the DB.
  private _createdAt:any;
  private _geometry:any;
  private _name:any;
  private _place:any;
  private _reports:any;
  private _type:string;



  constructor(){
  }

// Hard Attributes
  get createdAt(){
    return this._createdAt
  }

  set createdAt(value){
    this._createdAt = value;
  }


  get geometry(){
    return this._geometry;
  }

  set geometry(object){
    this._geometry = object;
  }

  get name(){
    if(this._name == null && this.type == "polygon"){
      let coors = L.geoJSON(this.geometry).getBounds().getCenter()
      this._name = `Unnamed Polygon Centered Around ${coors.lat}, ${coors.lng}`
    }

    if(this.type == "point"){
      return this._place.formatted_address
    }else{
      return this._name;
    }
  }

  set name(value){
    this._name = value
  }


  get place(){
    return this._place;
  }

  set place(value){
    this._place = value;
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
