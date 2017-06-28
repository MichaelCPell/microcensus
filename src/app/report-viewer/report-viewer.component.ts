import { Component, ViewChild, ViewContainerRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers/";
import { Report } from "../models/report";
import * as dynamicComponent from './dynamic_component_helpers'

@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer-component.css']
})

export class ReportViewerComponent implements AfterViewInit, OnDestroy, OnInit {
  public dataLoaded:boolean = false;
  private report$:any;
  public publishButton:string = "Save this Report";

  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;

  constructor(
    protected compiler: JitCompiler,
    private http: Http,
    private store:Store<fromRoot.State>) {
  }

  ngOnInit(){
    this.dynamicComponentTarget.clear()
  }

  ngAfterViewInit(){
    this.report$ = this.store.select(fromRoot.getReport)
          .skip(1) //Skip the initial, undefined report.  Then skip the current report on subsequent loads.
          .subscribe( (report) => {
            this.getHtml(report.reportSpecification.reportName).subscribe(
              tmpl => {
                this.dataLoaded = true;
                dynamicComponent.createComponentFactory(tmpl, report).then( factory => {
                    this
                      .dynamicComponentTarget
                      .createComponent(factory)
                })
              }
            )
          })
  }

  ngOnDestroy(){
    this.report$.unsubscribe();
  }

  public publish(){
    // TODO: Scrape html from page
    // this.publisher.publish(this.researchArea.researchArea.name,this.researchArea.radius, this.user.email)
  }

  private getHtml(reportName): Observable<string>{
    return this.http.get(environment.reportAssetBackend(reportName) + ".html")
                    .map( response => response.text())
  }
}




