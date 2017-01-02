import { Component, OnInit } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { DynamoDBService } from "../shared/ddb.service.ts";
import { User } from "../users/user";

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
    "age_and_education"
  ]

  constructor(private researchArea: ResearchAreaService, private ddb:DynamoDBService, private user:User) {
    this.selectedReport = "Select Report";

    this.researchArea = researchArea;
  }

  ngOnInit() {
  }


  public addAndAnalyze(){
    this.ddb.addLocation(this.researchArea.place.formatted_address, this.user.email.getValue());
    // [routerLink]="['/report_viewer/' + selectedReport]"
    //         class="btn btn-mc-dark"
  }
};
