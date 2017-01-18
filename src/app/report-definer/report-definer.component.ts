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

  constructor(private researchArea: ResearchAreaService, private ddb:DynamoDBService, public user:User,
    private router:Router) {
    this.selectedReport = "Select Report";

    this.researchArea = researchArea;
  }

  ngOnInit() {
  }


  public addAndAnalyze(){
    this.ddb.addLocation(this.researchArea.place.getValue(), this.user.email.getValue());

    this.router.navigate(['/report_viewer/', this.selectedReport.slug])
  }

  public readyToAnalyze(){
    return !this.researchArea.place && (this.selectedReport != 'Select Report')
  }

  public setReportType(report){
    this.selectedReport = report
  }
};
