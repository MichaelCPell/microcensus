import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers/";
import { Report } from "../models/report";
import { DynamicComponentFactoryService } from './dynamic_component_factory.service'
import { PublisherService } from "./publisher.service";
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer-component.css']
})

export class ReportViewerComponent implements AfterViewInit, OnDestroy {
  public dataLoaded:boolean = false;
  private report$:Observable<Report>;
  public publishButton:string = "Save this Report";
  public url:string;
  private tmpl:string;
  private reportSubscription:Subscription;

  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;


  constructor(
    private http: Http,
    private store:Store<fromRoot.State>,
    private dynamicComponentFactory:DynamicComponentFactoryService,
    private publisher:PublisherService,
    private angulartics:Angulartics2GoogleAnalytics) {

    this.store.select(fromRoot.getReportUrl)
      .skip(1)
      .subscribe(url => this.url = url)
  }

  ngAfterViewInit(){
    this.report$ = this.store.select(fromRoot.getReport)
    this.reportSubscription = this.report$
      .skip(1) //Skip the initial, undefined report.  Then skip the current report on subsequent loads.
      .take(1)
      .subscribe( (report) => {
        this.getHtml(report.reportSpecification.reportType.slug).subscribe(
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
    this.reportSubscription.unsubscribe();
    this.url = undefined;
    this.dynamicComponentTarget.clear()
  }

  public publish(){
    this.angulartics.eventTrack("new_publish", {
      category: 'Publish'
    })
    this.publisher.publish(this.tmpl)
  }

  private getHtml(reportName): Observable<string>{
    return this.http.get(environment.reportAssetBackend(reportName) + ".html")
                    .map( response => response.text())
  }
}




