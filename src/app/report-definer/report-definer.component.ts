import {Component, OnInit,
  ViewChild, ViewContainerRef, NgModule, AfterViewInit } from '@angular/core';
import {RuntimeCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http } from '@angular/http';

@Component({
  selector: 'app-report-definer',
  template: '<template #myDynamicContent> I will be replaced.</template>',
  styleUrls: ['./report-definer.component.css']
})

export class ReportDefinerComponent implements AfterViewInit {
   private templateUrl: string = './report-definer.component.html';

   @ViewChild('myDynamicContent', { read: ViewContainerRef })
   protected dynamicComponentTarget: ViewContainerRef;

  constructor(protected compiler: RuntimeCompiler, private http: Http) { }

  ngAfterViewInit() {
    let templateUrl = './report-definer.component.html'
    let html;
    var dataOne = [
      { "White": 100 ,
        "Black or African American": 200,
        "Asian" : 300 ,
        "Other": 400 }
    ]

    var dataTwo = [
      { "White": 200 ,
        "Black or African American": 200,
        "Asian" : 200 ,
        "Other": 200 }
    ]

    this.http.get("/report_templates/general_demographic_report.html")
      .subscribe(
        (response:any) => {
          this.createComponentFactory(response._body, {one: dataOne, two: dataTwo})
            .then((factory) => {
              this
                .dynamicComponentTarget
                .createComponent(factory)
            })
        }
      );
  }

  public createComponentFactory(template: string, data:any)
    : Promise<any>{
    let type   = this.createNewComponent(template, data);
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


  protected createNewComponent (tmpl:string, data:any) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = data;
        constructor(private http: Http){

        }

        ngOnInit(){
          if(this.data){
            this.http.get("/report_templates/general_demographic_report.js")
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
