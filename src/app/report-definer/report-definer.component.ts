import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from 'environments/environment';
import { ResearchAreaService } from '../shared/research-area.service';
import { User } from "../models/user";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReportTypeService } from "../services/report-type.service";
import { Store } from '@ngrx/store';
import { ReportType } from '../models/report-type'
import * as fromRoot from '../reducers'
import { ReportSpecificationService } from '../services/report-specification.service' 
import { ReportSpecification } from "../models/report-specification";
import * as reportSpecifications from "../actions/report-specifications.actions"

@Component({
  selector: 'app-report-definer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './report-definer.component.html',
  styleUrls: ['./report-definer.component.css'],
  providers: [ ReportTypeService ]
})
export class ReportDefinerComponent implements OnInit {
  selectedReport:string;
  radius:number;
  area:any;
  name:string;
  needsName:boolean = false;
  readyToAnalyze:boolean = false;
  showRadiusSelector = true;
  user$: Observable<User>;
  reportTypes$: Observable<ReportType[]>;
  activeReportType$: Observable<ReportType>;
  reportSpecification$: Observable<ReportSpecification>;

  constructor(public reportTypeService:ReportTypeService,
              public reportSpecificationService:ReportSpecificationService, 
              private store: Store<fromRoot.State>) {
      
      // this.user$ = store.select(fromRoot.getUser);
      this.reportTypes$ = store.select(fromRoot.getReportTypes);
      // this.activeReportType$ = store.select(fromRoot.getActiveReportType);
      this.reportSpecification$ = store.select(fromRoot.getReportSpecification);

      this.reportSpecification$.subscribe (
        data => console.log(data)
      )
  }

  ngOnInit():void {
    // this.radius = this.researchArea.radius;

    // if(this.researchArea){
    //   this.name = this.researchArea.researchArea.name;
    //   this.readyToAnalyze = true;
    // }
  }

  public submit(): void{
    // this.store.dispatch()
  }

  onRadiusChange(newRadius:number){
    let action = new reportSpecifications.SetRadiusAction(newRadius)
    this.store.dispatch(action)
  }

  onReportTypeChange(reportType){
    this.reportTypeService.setActive(reportType);
  }

  onAreaChange(newArea){
    this.area = newArea;
    if(newArea.areaType == "point"){
      // this.researchArea.place = newArea;
      this.showRadiusSelector = true;
    }else{
      // this.researchArea.shape = newArea;
      this.showRadiusSelector = false;
    }
    // this.name = this.researchArea.researchArea.name;
    this.readyToAnalyze = true;
  }

  onNameChange(newName){
    // this.researchArea.researchArea.name = newName;
    // this.name = this.researchArea.researchArea.name;
  }

  onPolygonDraw(polygon){
    // this.researchArea.shape = polygon;
    // this.name = this.researchArea.researchArea.name;
    this.needsName = true;
  }
};
