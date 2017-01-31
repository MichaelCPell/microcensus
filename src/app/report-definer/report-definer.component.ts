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
  @Input() name:string = "";
  selectedReport:string;
  readyToAnalyze:boolean = false;
  areaType:string = "point";
  radius:number;
  reportType:any;
  place:any;
  needsName:boolean = false;
  editingName:boolean = false;
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

      if(this.researchArea.researchArea.name){
        console.log(this.researchArea.researchArea)
        this.readyToAnalyze = true;
        this.areaType = this.researchArea.researchArea.type;
      }
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

  public onFileChange(event){
    this.areaType = "polygon";
    let file = event.target.files[0]
    let read = new FileReader();
    read.readAsBinaryString(file);
    this.needsName = true;

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

  onNameChange(value){
    this.name = value
  }

  editName(){
    if(this.editingName){
      this.researchArea.researchArea.name = this.name
      this.editingName= false;
    }else{
      this.editingName = true;
    }
  }
};
