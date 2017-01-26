export class ResearchArea {
  // Single Responsibility: Maintain the data that gets stored by a user to the DB.
  private _createdAt:any;
  private _geometry:any;
  private _name:any;
  private _place:any;
  private _reports:any;
  private _type:string;



  constructor(){
  //   if(args == null){
  //     return
  //   }
  //   Object.keys(args).forEach( key => {
  //     this[key] = args[key]
  //   })

  //   this.afterInit();
  // }

  // private afterInit(){
  //   if(this.type == "point"){
  //     this._radius = 1;
  //     this.lat = this._place.geometry.location.lat()
  //     this.lng = this._place.geometry.location.lng()

  //     this._geoJSON = {
  //         "type": "Point",
  //         "coordinates": [
  //             this.lng,
  //             this.lat
  //         ],
  //         "radius" : this.radiusInMeters
  //     }
  //   }else{
  //     this._geoJSON = geoJSON;
  //   }
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



// Virtual Attributes


  // get coordinates(){
  //   return [this.lat, this.lng];
  // }


}
