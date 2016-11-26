import {ComponentFactoryResolver, Component, OnInit,
  ViewChild, ViewContainerRef, NgModule, Injectable, AfterViewInit } from '@angular/core';
import {RuntimeCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http } from '@angular/http';
// import * as c3 from 'c3';

// let c3:any = c3;

@Component({
  selector: 'app-report-definer',
  template: '<template #myDynamicContent> I will be replaced.</template>',
  styleUrls: ['./report-definer.component.css']
})


// let foo:string = './report-definer.component.html';
//
// @Component({
//   selector: 'app-report-definer',
//   templateUrl: foo,
//   styleUrls: ['./report-definer.component.css']
// })

export class ReportDefinerComponent implements AfterViewInit {
   private templateUrl: string = './report-definer.component.html';

   @ViewChild('myDynamicContent', { read: ViewContainerRef })
   protected dynamicComponentTarget: ViewContainerRef;

  constructor(protected compiler: RuntimeCompiler, private http: Http) { }

  ngAfterViewInit() {

    let templateUrl = './report-definer.component.html'
    //
    // this.http
    //   .get("/report_templates/general_demographic_report.html")
    //   .map(this.extractData)
    //

    let html;


    var reportBarChart = [
      { "White": 100 ,
        "Black or African American": 200,
        "Asian" : 300 ,
        "Other": 400 }
    ]


    this.http.get("/report_templates/general_demographic_report.html")
      .subscribe(
        (response:any) => {
          this.createComponentFactory(response._body, reportBarChart)
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


  protected createNewComponent (tmpl:string, foo:any) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = foo;
        constructor(private http: Http){

        }

        ngOnInit(){
          if(this.data){
            this.http.get("/report_templates/general_demographic_report.js")
            .subscribe(
              (response:any) => {
                console.log(c3)
                // let c3 = c3;
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
      // a module for just this Type
      return RuntimeComponentModule;
  }


}
