import { Component, OnInit } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { DynamoDBService } from "../shared/ddb.service.ts";
import { User } from "../users/user";
import { Router } from "@angular/router";

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
  private _radius:number = 1;

  constructor(public researchArea: ResearchAreaService, private ddb:DynamoDBService, public user:User,
    private router:Router) {
  }

  ngOnInit() {
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

  public setNewPlace(place){
    this.readyToAnalyze = true;
    this.areaType = "point";
    console.log(place)
    place.radius = this.radius
    this.researchArea.create("point", null, place)
  }

  get radius(){
    return this._radius
  }

  set radius(value){
    this._radius = value
    this.researchArea.radius = value;
  }
};
