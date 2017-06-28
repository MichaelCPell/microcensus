import { NgModule, Component, OnInit } from '@angular/core';
import { Report } from "../models/report";
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

export const createComponentModule = (componentType: any) => {
      @NgModule({
        imports: [],
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule{}
      return RuntimeComponentModule;
  }

export const createNewComponent = (tmpl:string, report:Report) => {
      @Component({
          selector: 'dynamic-component',
          template: tmpl
      })
      class CustomDynamicComponent implements OnInit{
        public data:any = report.data;
        public reportName:string = report.reportSpecification.reportName;
        
        constructor(private http: Http){
        }

        ngOnInit(){
          const data = this.data;
          this.http.get(environment.reportAssetBackend(this.reportName) + ".js")
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


export const createComponentFactory = (template: string, report:Report)
    : Promise<any> => {
    let type   = createNewComponent(template, report);
    let module = createComponentModule(type);
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