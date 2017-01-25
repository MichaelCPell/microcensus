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
  public readyToAnalyze:boolean = false;
  public areaType:string = "point";
  private _radius:BehaviorSubject<number> = new BehaviorSubject(1);
  private _place:BehaviorSubject<any> = new BehaviorSubject({});


  constructor(public researchArea: ResearchAreaService, private ddb:DynamoDBService, public user:User,
    private router:Router) {
  }

  ngOnInit() {
    if(!this.radius){
      this.radius = 1;
    }
    
    if(!this.place){
      // TODO: This should only happen if ResearchService already has a place.
      this.place = {
        address: "555 Fayetteville Street"
      };
    }

    if(!this.reportType){
      this.reportType = this.reportTypes[0]
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

  // public setNewPolygon(event){
  //   this.readyToAnalyze = true;
  //   this.areaType = "polygon";
  //   let file = event.target.files[0]
  //   let read = new FileReader();
  //   read.readAsBinaryString(file);

  //   read.onloadend = () => {
  //     console.log(read.result);
  //     let json = JSON.parse(read.result);
  //     this.researchArea.create("polygon", json, null)
  //   }
  // }

  onRadiusChange(newRadius){
    this.radius = newRadius;
  }

  onPlaceChange(newPlace){
    this.place = newPlace
  }

  onReportTypeChange(reportType){
    this.reportType = reportType;
  }
};
