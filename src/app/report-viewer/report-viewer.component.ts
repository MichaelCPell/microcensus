import {Component, OnInit,
  ViewChild, ViewContainerRef, NgModule, AfterViewInit } from '@angular/core';
import {RuntimeCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ResearchAreaService } from "../shared/research-area.service";
import { DynamoDBService } from "../shared/ddb.service";
import { User } from "../users/user";
import {PublisherService} from "./publisher.service"

@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer-component.css']
})

export class ReportViewerComponent implements AfterViewInit {
  public reportName:string;
  public errorMessage:string;
  public report:any;
  public geom:any;
  public publishButton:string = "Save this Report";
  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;

  constructor(
    protected compiler: RuntimeCompiler,
    private http: Http,
    private route: ActivatedRoute,
    private researchArea: ResearchAreaService,
    private user:User,
    private publisher:PublisherService) {
    this.route = route;
    this.geom = this.researchArea.researchArea.geometry;
  }

  ngAfterViewInit() {
    this.route.params
      .subscribe((params: Params) =>  this.reportName = params["name"])

    let html;
    let tempReport;
    if(this.researchArea.researchArea.type == "point"){
      this.geom.radius = this.researchArea.radiusInMeters;
    }else{
      this.geom.radius = 0;
    }

    let researchSpecification = {
        reportName: this.reportName, 
        geoJSON: {
          type: "Feature",
          geometry: this.geom
        }
      }

    this.http.post(environment.backend, researchSpecification)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(
        (data => {
          this.publisher.addReportData(data);
          this.dataLoaded = true;
          tempReport = data;
        }).bind(this),
        error =>  this.errorMessage = <any>error,
        () => {
          this.report = tempReport;
          this.http.get(`/report_templates/${this.reportName}.html`)
            .subscribe(
              (response:any) => {
                this.publisher.addReportHtml(response._body);
                this.createComponentFactory(response._body, this.report, this.reportName)
                  .then((factory) => {
                    this
                      .dynamicComponentTarget
                      .createComponent(factory)
                  })
              }
            );
        }
      );
  };

  private createComponentFactory(template: string, data:any, reportName:string)
    : Promise<any>{
    let type   = this.createNewComponent(template, data, reportName);
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
  private createNewComponent (tmpl:string, data:any, reportName:string) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl,
          styleUrls: ['reports.css', 'print.css']
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = data;
        public reportName:string = reportName

        constructor(private http: Http, private researchArea:ResearchAreaService, private publisher:PublisherService){
        }

        ngOnInit(){
          if(this.data){
            this.http.get(`/report_templates/${this.reportName}.js`)
            .subscribe(
              ((response:any) => {
                this.data.address = this.researchArea.researchArea.name;
                this.data.geometry = this.researchArea.researchArea.geometry;
                this.data.radius = this.researchArea.radius;
                this.data.type = this.researchArea.researchArea.type;

                this.publisher.reportName = this.reportName;
                this.publisher.addReportData(this.data)
                this.publisher.addReportScript(response._body)
                this.publisher.addMapArea(this.data.geometry)

                eval(response._body)

                $(".promo").hide()
              }).bind(this)
            );
          }
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
      this.publisher.publish(this.researchArea.researchArea.name,this.researchArea.radius, this.user.email.getValue())
            .subscribe(
        (next) => {
          console.log(next)
          this.user.updateFromDdb(next["Attributes"])

          this.publishButton = "Saved to Dashboard!"
        },
        (error) => {
          console.log(error)
        }
      );
    }


}
