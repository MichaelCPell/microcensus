import {Component, OnInit,
  ViewChild, ViewContainerRef, NgModule, AfterViewInit } from '@angular/core';
import {RuntimeCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-report-view',
  template: '<template #myDynamicContent> I will be replaced.</template>',
  styleUrls: ['./report-viewer.component.css']
})

export class ReportViewerComponent implements AfterViewInit {
  public reportName:string;
  public geom = {"type":"Point","coordinates":[-79.52313700000002,36.09550000000001]}
  @ViewChild('myDynamicContent', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;

  constructor(protected compiler: RuntimeCompiler, private http: Http, private route: ActivatedRoute) {
    this.route = route;
  }

  ngAfterViewInit() {
    this.route.params
      .subscribe((params: Params) =>  this.reportName = params["name"])

    let html;
    let tempReport;
    this.http.post("http://localhost:4000", {reportName: this.reportName, geometry: this.geom})
      .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
          data => {
            console.log(data)
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



  }

  public createComponentFactory(template: string, data:any, reportName:string)
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


  protected createNewComponent (tmpl:string, data:any, reportName:string) {
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
                eval(response._body)
              }
            );
          }
        }
      };

      return CustomDynamicComponent;
  }
  protected createComponentModule (componentType: any) {
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
}
