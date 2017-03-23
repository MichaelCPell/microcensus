import { Injectable } from '@angular/core';
import { ResearchAreaService } from "../shared/research-area.service";
import { DynamoDBService } from "../shared/ddb.service";
import { S3Service } from "../shared/s3.service";


@Injectable()
export class PublisherService {
  private _reportName:string;
  private _head:Array<string> = [];
  private _body:Array<string> = []; 
  private _reportData:any;

  constructor(private researchArea:ResearchAreaService,private ddb: DynamoDBService, private s3: S3Service) { 
    this.resetReportArrays();
  }

  get head(){
    return this._head;
  }

  get body(){
    return this._body;
  }

  get reportName(){
    return this._reportName
  }

  set reportName(name){
    this._reportName = name
  }

  public addReportHtml(htmlString){
    // This method should be called before addReportScript()
    this.resetReportArrays()
    this.body.push(htmlString);
  }

  public addReportData(data){
    this._reportData = data
    this.body.push("<script> var data = " + JSON.stringify(data) + "</script>");
  }

  public addReportScript(javascriptString){
    this.body.push("<script>" + javascriptString + "</script>");
  }

  public addMapArea(area: string){

    var mapString = `
    <script>
    var ra = ${JSON.stringify(area)};
    var zoomLevel = 13;
    var map = L.map('map').setView([35.7796, -78.6382], zoomLevel);
    if(ra.radius > 15000){
      zoomLevel = 10;
    }else if(ra.radius > 8000){
      zoomLevel = 11;
    }else if(ra.radius > 3000){
      zoomLevel = 12;
    }else if(ra.radius > 1000){
      zoomLevel = 13;
    }
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    if(ra.type == "Point"){
      var marker = L.marker([ra.coordinates[1], ra.coordinates[0]]).addTo(map);
      var shapeLayer = L.circle([ra.coordinates[1], ra.coordinates[0]], ra.radius).addTo(map);
      map.setView(marker.getLatLng(), zoomLevel);
    }else if(ra.type == "polygon" || ra.type == "Polygon"){
      var shapeLayer = L.geoJSON(ra.geometry).addTo(map);
      map.fitBounds(shapeLayer.getBounds());
    }
    </script>
    `

    this.body.push(mapString)
  }

  public publish(address:string, radius:number, email:string){
    let fileName;

    if(this._reportData.type == "point"){
      let reportName = this._reportName
      let address = this._reportData.address
      let buffer = this._reportData.radius + " mile radius"

      fileName = `${reportName}_${address}_${buffer}`
    }
    
    var f = new File(["<html>", this.head.join(""), "<body>", this.body.join(""),"</body>", "</html>"], fileName ,{type: "text/html"});

    return this.s3
      .publishReport(f, this.reportName, address, radius, email)
      .concatMap(this.ddb.addReport);
  }


  private resetReportArrays(){
    this._body = [];
    this._head = [];

    this._head.push("<head>")

    this._head.push('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>');
    this._head.push('<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.0/d3.min.js"></script>');
    this._head.push('<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.js"></script>');
    this._head.push('<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>');
    
    this._head.push('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.css">');
    this._head.push('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
    this._head.push('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />');
    this._head.push('<link rel="stylesheet" href="https://s3.amazonaws.com/microcensus-assets/report-styles/print.css" rel="stylesheet">')
    this._head.push('<link rel="stylesheet" href="https://s3.amazonaws.com/microcensus-assets/report-styles/reports.css" rel="stylesheet">')
    
    this._head.push("</head>")

  }

}


interface Dependency{
  fileType:string,
  text?:string,

}
