import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReportType } from '../models/report-type';
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers'
import * as reportTypes from '../actions/report-type';

@Injectable()
export class ReportTypeService {
  public all: ReportType[];

  static readonly defaultReportTypes:ReportType[] = [
    {
      name: "General Demographic Report",
      description: "This report shows general demographics for a region such as ages, education, races, household values and incomes.",
      slug: "general_demographic"
    },
    {
      name: "Longitudinal Population Report",
      description: "Population for the selected area according to the 1990, 2000 and 2010 Decennial census.",
      slug: "longitudinal_population"
    },
    {
      name: "Longitudinal House Value Report",
      description: "Displays the mediam house value for the research area across time.",
      slug: "longitudinal_house_value"
    },
    {
      name: "Longitudinal Median Income Report",
      description: "Displays the median income for the research area across time.",
      slug: "longitudinal_median_income"
    },
    {
      name: "Age and Education Report",
      description: "Granular break downs of the various age groups and levels of educational attainment for the research area.",
      slug: "age_and_education"
    }
  ];

  constructor(private store:Store<fromRoot.State>) { 
    this.store = store;
  }

  public setActive(reportType:ReportType){
    this.store.dispatch(new reportTypes.SetActiveAction(reportType))
  }


}
