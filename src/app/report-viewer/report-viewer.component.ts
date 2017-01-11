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
import { S3Service } from "../shared/s3.service";
import { DynamoDBService } from "../shared/ddb.service";
import { User } from "../users/user"

@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
  styleUrls: [
    './report-viewer.component.css',
    './print.css']
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
    private s3: S3Service,
    private ddb: DynamoDBService,
    private user:User) {
    this.route = route;
    this.geom = {
      "type":"Point",
      "coordinates": this.researchArea.coordinates
    };
  }

  ngAfterViewInit() {
    this.route.params
      .subscribe((params: Params) =>  this.reportName = params["name"])

    let html;
    let tempReport;
    this.http.post(environment.backend, {reportName: this.reportName, geometry: this.geom})
      .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
          data => {
            tempReport = data;
          },
          error =>  this.errorMessage = <any>error,
          () => {
            this.report = tempReport;
            this.http.get(`/report_templates/${this.reportName}.html`)
              .subscribe(
                (response:any) => {
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


  public publish(){
    let slug = this.convertToSlug(this.researchArea.place.getValue().formatted_address)
    // let slug = "early_moon_calfs"
    let address = this.researchArea.place.getValue().formatted_address
    // let address = "204 Windrift Dr, Gibsonville, NC 27249, USA"
    var filename =  slug + "_" + this.reportName
    var f = new File([document.querySelector("#publishableContent").outerHTML], filename ,{type: "text/html"});
    this.s3
      .publishReport(f, this.reportName, address, this.user.email.getValue())
      .concatMap(this.ddb.addReport)
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
          styleUrls: [
            './report-viewer.component.css',
            './print.css']
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = data;
        public reportName:string = reportName

        constructor(private http: Http, private researchArea:ResearchAreaService){
        }

        ngOnInit(){
          if(this.data){
            this.http.get(`/report_templates/${this.reportName}.js`)
            .subscribe(
              ((response:any) => {
                this.data.address = this.researchArea.place.getValue().formatted_address
                eval(response._body)
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

  private convertToSlug(Text){
      return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }
}
