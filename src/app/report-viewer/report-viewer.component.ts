import {Component, OnInit,
  ViewChild, ViewContainerRef, NgModule, AfterViewInit } from '@angular/core';
import {RuntimeCompiler} from '@angular/compiler';
import * as _ from 'lodash';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as AWS from 'aws-sdk';



@Component({
  selector: 'app-report-view',
  templateUrl: './report-viewer.component.html',
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



  };

  public publish(){

    var albumBucketName = 'deletelater123';
    var bucketRegion = 'us-east-1';
    var IdentityPoolId = 'us-east-1_USx2I1lHS';

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
    });

    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName}
    });

    var f = new File([document.documentElement.outerHTML], {type: "text/html"})
    s3.upload({
      Key: "report.html",
      Body: f,
      ACL: 'public-read',
      ContentType: 'text/html'
    }, function(err, data) {
      if (err) {
        console.log(err)
        return
        // return alert('There was an error uploading: ', err.message);

      }
      alert('Successfully uploaded photo.');
    });
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
                eval(response._body)
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
}
