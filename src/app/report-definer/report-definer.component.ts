import { Component, OnInit, Input } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { User } from "../users/user";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReportTypeService } from "./services/report-type.service";


interface ReportType{
  slug: string;
  name: string;
}

@Component({
  selector: 'app-report-definer',
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css'],
  providers: [ ReportTypeService ]
})
export class ReportDefinerComponent implements OnInit {
  selectedReport:string;
  radius:number;
  reportType:ReportType = {name: "temp", slug: "temp"};
  reportTypes:Set<any>;
  area:any;
  name:string;
  needsName:boolean = false;
  readyToAnalyze:boolean = false;
  showRadiusSelector = true;

  constructor(public researchArea: ResearchAreaService, public user:User,
    private router:Router, public reportTypeService:ReportTypeService) {
      
      // reportTypeService.eventStream.subscribe(
      //   (reportTypeArray) => {
      //     // if(!reportTypeArray) return;

      //     this.reportType = reportTypeArray.entries()[0];
      //     this.reportTypes = reportTypeArray;

      //   }
      // )
  }

  ngOnInit():void {
    this.radius = this.researchArea.radius;

    if(this.researchArea){
      this.name = this.researchArea.researchArea.name;
      this.readyToAnalyze = true;
    }
  }

  public addAndAnalyze(): void{
    this.researchArea.storeLocation(this.user.email);
    this.router.navigate(['/report_viewer/', this.reportType.slug])
  }

  onRadiusChange(newRadius){
    this.radius = newRadius;
    this.researchArea.radius = newRadius;
  }

  onReportTypeChange(reportType){
    this.reportType = reportType;
  }

  onAreaChange(newArea){
    this.area = newArea;
    if(newArea.areaType == "point"){
      this.researchArea.place = newArea;
      this.showRadiusSelector = true;
    }else{
      this.researchArea.shape = newArea;
      this.showRadiusSelector = false;
    }
    this.name = this.researchArea.researchArea.name;
    this.readyToAnalyze = true;
  }

  onNameChange(newName){
    this.researchArea.researchArea.name = newName;
    this.name = this.researchArea.researchArea.name;
  }

  onPolygonDraw(polygon){
    this.researchArea.shape = polygon;
    this.name = this.researchArea.researchArea.name;
    this.needsName = true;
  }
};
