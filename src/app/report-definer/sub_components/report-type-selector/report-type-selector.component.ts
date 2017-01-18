import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-type-selector',
  templateUrl: './report-type-selector.component.html',
  styleUrls: ['./report-type-selector.component.css']
})
export class ReportTypeSelectorComponent implements OnInit {

  public reports = [
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

  public selectedReport:any = this.reports[0];
  @Output() selectedReportChange:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public setReport(report){
    this.selectedReport = report;
    this.selectedReportChange.emit(this.selectedReport);
  }
}
