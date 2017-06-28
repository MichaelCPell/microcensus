import {Component, ViewChild, ViewContainerRef, NgModule, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {JitCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ResearchAreaService } from "../shared/research-area.service";
import { DynamoDBService } from "../services/ddb.service";
import { User } from "../models/user";
import {PublisherService} from "./publisher.service"
import * as jquery from 'jquery';
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers/";
import { Report } from "../models/report"

window['jQuery'] = window['$'] = jquery;

@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer-component.css']
})

export class ReportViewerComponent implements AfterViewInit, OnDestroy, OnInit {
  public dataLoaded:boolean = false;
  private report:any;
  private report$:any;
  public publishButton:string = "Save this Report";

  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;

  constructor(
    protected compiler: JitCompiler,
    private http: Http,
    private route: ActivatedRoute,
    private researchArea: ResearchAreaService,
    private publisher:PublisherService,
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
                this.createComponentFactory(tmpl, report).then( factory => {
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

  private createComponentFactory(template: string, report:Report)
    : Promise<any>{
    let type   = this.createNewComponent(template, report);
    let module = this.createComponentModule(type);
    let factory;

    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
              factory = _.find(moduleWithFactories.componentFactories, { componentType: type });
              resolve(factory);
            });
    });
  }
  private createNewComponent (tmpl:string, report:Report) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = report.data;
        public reportName:string = report.reportSpecification.reportName;
        
        constructor(private http: Http, private publisher:PublisherService){
        }

        ngOnInit(){
          const data = this.data;
          this.http.get(environment.reportAssetBackend(this.reportName) + ".js")
            .subscribe(
              ((response:Response) => {
                // this.publisher.reportName = this.reportName;
                // this.publisher.addReportData(this.data)
                // this.publisher.addReportScript(response._body)
                // this.publisher.addMapArea(this.data.geometry)

                eval(response.text())

                window['$'](".share-buttons").remove()
                window['$'](".share-this-report").remove()
                window['$'](".promo").remove()
              })
            );
        }
      };

      return CustomDynamicComponent;
  }
  private createComponentModule (componentType: any) {
      @NgModule({
        imports: [],
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule
      {

      }
      return RuntimeComponentModule;
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




