import { Component, OnInit } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { DynamoDBService } from "../shared/ddb.service.ts";
import { User } from "../users/user";
import { Router } from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-report-definer',
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css']
})
export class ReportDefinerComponent implements OnInit {
  public selectedReport:string;
  public reportTypes:Array<string> = [
    "general_demographic_report",
    "longitudinal_population_report",
    "age_and_education",
    "nc_voter_plus"
  ]
  public readyToAnalyze:boolean = false;
  public areaType:string = "point";
  private _radius:BehaviorSubject<number> = new BehaviorSubject(1);
  private _place:BehaviorSubject<any> = new BehaviorSubject({});


  constructor(public researchArea: ResearchAreaService, private ddb:DynamoDBService, public user:User,
    private router:Router) {
  }

  ngOnInit() {
    if(this.researchArea.place){
      this.place = this.researchArea.place
    }

    if(this.researchArea.radius){
      this.radius = this.researchArea.radius
    }
  }

  public setNewPolygon(event){
    let file = event.target.files[0]
    let read = new FileReader();
    read.readAsBinaryString(file);

    read.onloadend = function(){
        console.log(read.result);
    }
  }

  public addAndAnalyze(){
    this.ddb.addLocation(this.researchArea, this.user.email.getValue());
    this.router.navigate(['/report_viewer/', this.selectedReport.slug])
  }

  public setReportType(report){
    this.selectedReport = report
  }

  public setNewPolygon(event){
    this.readyToAnalyze = true;
    this.areaType = "polygon";
    let file = event.target.files[0]
    let read = new FileReader();
    read.readAsBinaryString(file);

    read.onloadend = () => {
      console.log(read.result);
      let json = JSON.parse(read.result);
      this.researchArea.create("polygon", json, null)
    }
  }

  get place(){
    return this._place.getValue()
  }

  get placeObs(){
    return this._place
  }

  set place(value){
    this.researchArea.place = {type: "point", radius: this.radius, place: value}
    this.readyToAnalyze = true;
    this._place.next(value)
  }

  get radius(){
    return this._radius.getValue()
  }

  get radiusObs(){
    return this._radius
  }

  set radius(value){
    this.researchArea.radius = value;
    this._radius.next(value)
  }
};
