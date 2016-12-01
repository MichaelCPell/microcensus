import { Component, OnInit } from '@angular/core';
import {environment} from 'environments/environment'

@Component({
  selector: 'app-report-definer',
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css']
})
export class ReportDefinerComponent implements OnInit {
  public selectedReport:string;

  constructor() {
    this.selectedReport = "general_demographic_report";
  }

  ngOnInit() {
  }
};
