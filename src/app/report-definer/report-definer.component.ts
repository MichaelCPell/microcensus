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
  public readyToAnalyze:boolean = false;

  constructor(private researchArea: ResearchAreaService, private ddb:DynamoDBService, public user:User,
    private router:Router) {

    this.researchArea = researchArea;

    this.researchArea.place.subscribe(
      (place => {
        if(place.formatted_address){
          this.readyToAnalyze = true;
        }else{
          this.readyToAnalyze = false;
        }
      }).bind(this)
    )
  }

  ngOnInit() {
  }


  public addAndAnalyze(){
    this.ddb.addLocation(this.researchArea.place.getValue(), this.user.email.getValue());

    this.router.navigate(['/report_viewer/', this.selectedReport.slug])
  }



  public setReportType(report){
    this.selectedReport = report
  }
};
