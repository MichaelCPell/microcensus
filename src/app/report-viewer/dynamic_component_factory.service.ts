import { NgModule, Component, OnInit, Injectable } from '@angular/core';
import { Report } from "../models/report";
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { JitCompiler } from '@angular/compiler';

@Injectable()
export class DynamicComponentFactoryService{

  constructor(private compiler:JitCompiler){

  }

  createComponentFactory = (template: string, report:Report)
    : Promise<any> => {
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


  createNewComponent = (tmpl:string, report:Report) => {
      @Component({
          selector: 'dynamic-component',
          template: tmpl
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = report.data;
        
        constructor(private http: Http){
        }

        ngOnInit(){
          const data = this.data;
          this.http.get(environment.reportAssetBackend(report.reportSpecification.reportType.slug) + ".js")
            .subscribe(
              ((response:Response) => {
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


  createComponentModule = (componentType: any) => {
      @NgModule({
        imports: [],
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule{}
      return RuntimeComponentModule;
  }
}

