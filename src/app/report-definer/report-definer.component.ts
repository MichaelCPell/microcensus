import { Component, OnInit, Input } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { User } from "../users/user";
import { Router } from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-report-definer',
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css']
})
export class ReportDefinerComponent implements OnInit {
  selectedReport:string;
  radius:number;
  reportType:any;
  area:any;
  name:string;
  readyToAnalyze:boolean = false;

  reportTypes:Array<any> = [
    {
      name: "General Demographic Report",
      description: "This report shows general demographics for a region such as ages, education, races, household values and incomes.",
      slug: "general_demographic_report"
    },
    {
      name: "Longitudinal Population Report",
      description: "Population for the selected area according to the 1990, 2000 and 2010 Decennial census.",
      slug: "longitudinal_population_report"
    },
    {
      name: "NC Voter Plus Report",
      description: "This report includes counts of political affiliation by party: REP, DEM, UNA (unaffiliated), and LIB (libertarian).  It also includes demographic data similar to the General Demographic Report.",
      slug: "nc_voter_plus"
    },
    {
      name: "Age and Education Report",
      description: "Granular break downs of the various age groups and levels of educational attainment for the research area.",
      slug: "age_and_education"
    },
    {
      name: "Local Business Report",
      description: "Captures businesses that are located with the radius and displays them on a map.",
      slug: "business_report_builder"
    }
  ];
  
  constructor(public researchArea: ResearchAreaService, public user:User,
    private router:Router) {

  }

  ngOnInit() {
    this.radius = this.researchArea.radius;

    if(!this.reportType){
      this.reportType = this.reportTypes[0]
      this.researchArea.reportType = this.reportType;
    }
    
    this.user.privateReportTypes.subscribe(data => { 
      if(data){
        this.reportTypes = this.reportTypes.concat(data)
      }
    })
  }

  public addAndAnalyze(){
    this.researchArea.storeLocation(this.user.email.getValue());
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
    }else{
      this.researchArea.shape = newArea;
    }
    this.name = this.researchArea.researchArea.name;
    this.readyToAnalyze = true;
  }

  onNameChange(newName){
    this.researchArea.researchArea.name = newName;
    this.name = this.researchArea.researchArea.name;
  }
};
