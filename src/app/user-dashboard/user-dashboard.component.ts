import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ResearchAreaService } from "../shared/research-area.service";
import { FormsModule } from "@angular/forms";
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers/'
import { Observable } from 'rxjs';
import * as reportSpecification from '../actions/report-specifications.actions';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  locations$:Observable<any[]>;
  public search:string = "";

  constructor(private router:Router, 
              private researchArea: ResearchAreaService,
              private store:Store<fromRoot.State>,
              private angulartics:Angulartics2GoogleAnalytics) { 
      angulartics.pageTrack("/dashboard")
      this.locations$ = store.select(fromRoot.getLocations)
  }

  ngOnInit() {
  }

  public setReportSpecificationTo(location){
    this.angulartics.eventTrack("set_report_type", {
      category: 'Dashboard'
    })
    let action = new reportSpecification.SetGeoJSONAction(location);
    this.store.dispatch(action);
  }
}
