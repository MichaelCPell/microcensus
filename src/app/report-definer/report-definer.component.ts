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
  selectedReport:string;
  readyToAnalyze:boolean = false;
  areaType:string = "point";
  radius:number;
  reportType:any;
  place:any;
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
    }
  ];
  
  constructor(public researchArea: ResearchAreaService, private ddb:DynamoDBService, public user:User,
    private router:Router) {
  }

  ngOnInit() {
    this.radius = this.researchArea.radius;
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


  public addAndAnalyze(){
    this.ddb.addLocation(this.researchArea, this.user.email.getValue());
    this.router.navigate(['/report_viewer/', this.selectedReport.slug])
  }

  public onFileChange(event){
    this.areaType = "polygon";
    let file = event.target.files[0]
    let read = new FileReader();
    read.readAsBinaryString(file);

    read.onloadend = () => {
      console.log(read.result);
      let json = JSON.parse(read.result);
      this.researchArea.shape = json
      this.readyToAnalyze = true;
    }
  }
  
  onRadiusChange(newRadius){
    this.radius = newRadius;
    this.researchArea.radius = newRadius;
  }

  onPlaceChange(newPlace){
    this.areaType = "point";
    this.place = newPlace
    this.researchArea.place = this.place;
    this.readyToAnalyze = true;
  }

  onReportTypeChange(reportType){
    this.reportType = reportType;
  }
};
