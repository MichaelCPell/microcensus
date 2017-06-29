import { Injectable } from '@angular/core';
import { ResearchAreaService } from "../shared/research-area.service";
import { DynamoDBService } from "../services/ddb.service";
import { S3Service } from "../shared/s3.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers/"
import * as reportActions from "../actions/report.actions"

@Injectable()
export class PublisherService {
  private _reportName:string;
  private _head:Array<string> = [];
  private _body:Array<string> = []; 
  private _reportData:any;

  constructor(
      private ddb: DynamoDBService, 
      private s3: S3Service,
      private store:Store<fromRoot.State>
      ) { }

  publish(html){
    this.store.select(fromRoot.getReport).subscribe(
      report => {
        if(report.reportSpecification.geoJSON.geometry.type == "Point"){
          let radius = report.reportSpecification.geoJSON.geometry.radius / 1600
          
          let fileName = `${report.reportSpecification.reportName}_${report.reportSpecification.geoJSON.properties.address}_${radius}_mile_radius`    

          let f = new File([this.dataVarSnippet(report), html], fileName ,{type: "text/html"});
        

          this.s3.publishReport(f).subscribe( data => {
            let action = new reportActions.SetUrlAction(`http://${data.Bucket}/${data.Key}`)
            this.store.dispatch(action)
          })
        }
        
      }
    ).unsubscribe()
  }


  private dataVarSnippet(report){
    return `
              <script>
                var data = ${JSON.stringify(report.data)};
                var reportSpecification = ${JSON.stringify(report.reportSpecification)}
              </script>
            `
  }
}