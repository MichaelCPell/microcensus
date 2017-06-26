import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ResearchAreaService } from "../shared/research-area.service";
import { FormsModule } from "@angular/forms";
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers/'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  locations$:Observable<any[]>;
  
  constructor(private router:Router, 
              private researchArea: ResearchAreaService,
              private store:Store<fromRoot.State>) { 

      this.locations$ = store.select(fromRoot.getLocations)
  }

  ngOnInit() {
  }

  public makeReportWithLocation(location){
    this.researchArea.object = location
    this.router.navigate(["/"]);
  }
}
