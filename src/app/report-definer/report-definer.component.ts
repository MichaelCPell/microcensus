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
import * as reportSpecifications from "../actions/report-specifications.actions";
import { ReportGeneratorService } from "../services/report-generator.service"

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
              private reportGeneratorService:ReportGeneratorService,
              private store: Store<fromRoot.State>) {
      
      this.reportTypes$ = store.select(fromRoot.getReportTypes);
      this.reportSpecification$ = store.select(fromRoot.getReportSpecification);

      this.reportSpecification$.subscribe(
        rs => {
          if(rs.geoJSON.geometry.type == "Polygon"){
            this.showRadiusSelector = false;
          }
        }
      )
  }

  ngOnInit():void {

  }

  public submit(): void{
    this.reportGeneratorService.generate()
  }

  onRadiusChange(newRadius:number){
    let action = new reportSpecifications.SetRadiusAction(newRadius)
    this.store.dispatch(action)
  }

  onReportTypeChange(reportType){
    let action = new reportSpecifications.SetReportTypeAction(reportType) 
    this.store.dispatch(action)
  }

  onAreaChange(newArea){
    let action;
    if(newArea == undefined){
      action = new reportSpecifications.SetLocationAction(undefined)
    }else{
      let location = {
        coordinates: [newArea.geometry.location.lng(), newArea.geometry.location.lat()],
        address: newArea.formatted_address
      }
      action = new reportSpecifications.SetLocationAction(location)
    }

    this.store.dispatch(action)
  }

  onNameChange(newName){
    let action = new reportSpecifications.SetAddressAction(newName)
    this.store.dispatch(action)
  }

  onPolygonDraw(polygon){
    let action = new reportSpecifications.SetGeoJSONAction(polygon)
    this.store.dispatch(action)
  }
};
