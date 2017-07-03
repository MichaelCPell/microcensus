import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers/";
import { Report } from "../models/report";
import { DynamicComponentFactoryService } from './dynamic_component_factory.service'
import { PublisherService } from "./publisher.service";

@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer-component.css']
})

export class ReportViewerComponent implements AfterViewInit, OnDestroy {
  public dataLoaded:boolean = false;
  private report$:any;
  public publishButton:string = "Save this Report";
  public url:string;
  private tmpl:string;

  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;


  constructor(
    private http: Http,
    private store:Store<fromRoot.State>,
    private dynamicComponentFactory:DynamicComponentFactoryService,
    private publisher:PublisherService) {

    this.store.select(fromRoot.getReportUrl)
      .skip(1)
      .subscribe(url => this.url = url)
  }

  ngAfterViewInit(){
    this.report$ = this.store.select(fromRoot.getReport)
          .skip(1) //Skip the initial, undefined report.  Then skip the current report on subsequent loads.
          .take(1)
          .subscribe( (report) => {
            this.getHtml(report.reportSpecification.reportName).subscribe(
              tmpl => {
                this.tmpl = tmpl;
                this.dataLoaded = true;
                this.dynamicComponentFactory.createComponentFactory(tmpl, report).then( factory => {
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
    this.url = undefined;
    this.dynamicComponentTarget.clear()
  }

  public publish(){
    this.publisher.publish(this.tmpl)
  }

  private getHtml(reportName): Observable<string>{
    return this.http.get(environment.reportAssetBackend(reportName) + ".html")
                    .map( response => response.text())
  }
}




