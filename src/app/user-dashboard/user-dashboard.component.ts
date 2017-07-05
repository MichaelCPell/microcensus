import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ResearchAreaService } from "../shared/research-area.service";
import { FormsModule } from "@angular/forms";
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers/'
import { Observable } from 'rxjs';
import * as reportSpecification from '../actions/report-specifications.actions'

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
              private store:Store<fromRoot.State>) { 

      this.locations$ = store.select(fromRoot.getLocations)
  }

  ngOnInit() {
  }

  public setReportSpecificationTo(location){
    let action = new reportSpecification.SetGeoJSONAction(location);
    this.store.dispatch(action);
  }
}
