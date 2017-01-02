import {Component, OnInit,
  ViewChild, ViewContainerRef, NgModule, AfterViewInit } from '@angular/core';
import {RuntimeCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ResearchAreaService } from "../shared/research-area.service";
import { S3Service } from "../shared/s3.service";

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
  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;

  constructor(
    protected compiler: RuntimeCompiler,
    private http: Http,
    private route: ActivatedRoute,
    private researchArea: ResearchAreaService,
    private s3: S3Service) {
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
    // let slug = this.convertToSlug(this.researchArea.place.formatted_address)
    let slug = "early_moon_calfs"

    var filename =  slug + "_" + this.reportName
    var f = new File([document.documentElement.outerHTML], filename ,{type: "text/html"});
    this.s3.publishReport(f).subscribe(
      (next) => {

        

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
          template: tmpl
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = data;
        public reportName:string = reportName

        constructor(private http: Http){
        }

        ngOnInit(){
          if(this.data){
            this.http.get(`/report_templates/${this.reportName}.js`)
            .subscribe(
              (response:any) => {
                let data = this.data;
                console.log(data)
                // eval(response._body)
              }
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
