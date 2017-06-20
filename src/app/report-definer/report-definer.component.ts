import { Component, OnInit, Input } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { User } from "../users/user";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReportTypeService } from "./services/report-type.service";

@Component({
  selector: 'app-report-definer',
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css'],
  providers: [ ReportTypeService ]
})
export class ReportDefinerComponent implements OnInit {
  selectedReport:string;
  radius:number;
  reportType:any;
  area:any;
  name:string;
  needsName:boolean = false;
  readyToAnalyze:boolean = false;
  showRadiusSelector = true;

  reportTypes:Array<any> = [
    {
      name: "General Demographic Report",
      description: "This report shows general demographics for a region such as ages, education, races, household values and incomes.",
      slug: "general_demographic"
    },
    {
      name: "Longitudinal Population Report",
      description: "Population for the selected area according to the 1990, 2000 and 2010 Decennial census.",
      slug: "longitudinal_population"
    },
    {
      name: "Longitudinal House Value Report",
      description: "Displays the mediam house value for the research area across time.",
      slug: "longitudinal_house_value"
    },
    {
      name: "Longitudinal Median Income Report",
      description: "Displays the median income for the research area across time.",
      slug: "longitudinal_median_income"
    },
    {
      name: "Age and Education Report",
      description: "Granular break downs of the various age groups and levels of educational attainment for the research area.",
      slug: "age_and_education"
    }
  ];

  constructor(public researchArea: ResearchAreaService, public user:User,
    private router:Router, private reportTypeService:ReportTypeService) {

  }

  ngOnInit():void {
    this.radius = this.researchArea.radius;

    if(!this.reportType){
      this.reportType = this.reportTypes[0]
      this.researchArea.reportType = this.reportType;
    }

    console.log(JSON.stringify(this.user))
    // this.reportTypes = this.reportTypes.concat(this.user.privateReportTypes)

      // console.log(this.user.privateReportTypes)
    
    // this.user.privateReportTypes.forEach( (rt) => {
    //   this.reportTypes.push(rt)
    //   console.log(this.reportTypes)
    // })

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
