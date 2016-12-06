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

  constructor(private researchArea: ResearchAreaService) {
    this.selectedReport = "general_demographic_report";

    this.researchArea = researchArea;
  }

  ngOnInit() {

  }
};
