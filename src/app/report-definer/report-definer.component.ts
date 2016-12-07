import { Component, OnInit } from '@angular/core';
import {environment} from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';

@Component({
  selector: 'app-report-definer',
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css']
})
export class ReportDefinerComponent implements OnInit {
  public selectedReport:string;
  public reportTypes:Array<string> = [
    "general_demographic_report",
    "longitudinal_population_report"
  ]

  constructor(private researchArea: ResearchAreaService) {
    this.selectedReport = "Select Report";

    this.researchArea = researchArea;
  }

  ngOnInit() {

  }
};
