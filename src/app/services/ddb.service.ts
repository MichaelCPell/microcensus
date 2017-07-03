import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Observable} from "rxjs";
import { Store } from "@ngrx/store";
import { AwsService } from './aws.service'
import * as fromRoot from '../reducers';
import * as fromUser from '../reducers/user.reducer';
import * as userActions from '../actions/user';

@Injectable()
export class DynamoDBService {
    private db;
    
    constructor(
        private awsService:AwsService,
        private store:Store<fromRoot.State>) {

          this.store.select(fromRoot.getUserSub)
            .filter(Boolean).subscribe(
            sub => {
              this.db = new awsService.AWS.DynamoDB.DocumentClient();
              this.db.get({
                TableName: "cartoscope_users_dev",
                Key: {sub: sub},
                AttributesToGet: ['email', 'locations', 'reportTypes']
              }, (err, data) => {
                if(err){
                  console.log(err)
                }

                let newUser = new User(data.Item.email, data.Item.locations, data.Item.reportTypes)
                this.store.dispatch(new userActions.LoadAction(newUser))
              })
            })

          this.store.select(fromRoot.getReport)
            .filter( (report, i) => !!report.url)
            .withLatestFrom(this.store.select(fromRoot.getUserState))
            .filter( (report, i) => !!report[1].email)
            .subscribe(
              report => {
                this.db = new awsService.AWS.DynamoDB.DocumentClient();
                this.addLocation(this.db, report[0], report[1]).subscribe(
                  user => {
                    this.addReport(this.db, report[0], report[1]).subscribe(
                      data => {
                        let action = new userActions.SetLocationsAction(data.Attributes.locations)
                        this.store.dispatch(action)
                      }
                    )
                  },
                  err => {
                    if(err == "Location Exists"){
                      this.addReport(this.db, report[0], report[1]).subscribe(
                        data => {
                          let action = new userActions.SetLocationsAction(data.Attributes.locations)
                          this.store.dispatch(action)
                        }
                      )
                    }else{
                      console.log("Unexpected Error");
                    }
                  }
                )
              }
            )
    }

    public addLocation(client, report, user){
      const params = {
        TableName: 'cartoscope_users_dev',
        Key: { sub: user.sub},
        ConditionExpression: 'attribute_not_exists(#a.#id)',
        UpdateExpression: 'set #a.#id = :z',
        ExpressionAttributeNames: {
          '#a' : 'locations',
          '#id' : report.reportSpecification.geoJSON.properties.address
        },
        ExpressionAttributeValues: {
          ':z': {
            name: report.reportSpecification.geoJSON.properties.address,
            type: report.reportSpecification.geoJSON.geometry.type,
            geometry: report.reportSpecification.geoJSON.geometry,
            createdAt: Date.now(),
            reports: {}
          }
        },
        ReturnValues: 'ALL_NEW'
      }

      return Observable.create( observer => {
        client.update(params, (err, data) => {
          if(err){
            if(err.code == "ConditionalCheckFailedException"){
              //Location already exists for user, do not overwrite
              observer.error("Location Exists")
            }else{
              console.log(err);
            }
          } 
          else{
            observer.next(data)
          }
        })
      })
    }

    public addReport(client, report, user){
      const reportName = `${report.reportSpecification.reportName} ${report.reportSpecification.geoJSON.geometry.radius}`
      
      var params = {
        TableName: 'cartoscope_users_dev',
        Key: { sub: user.sub},
        UpdateExpression: 'set #a.#id.#b.#reportName = :z',
        ExpressionAttributeNames: {
          '#a' : 'locations',
          '#id' : report.reportSpecification.geoJSON.properties.address,
          '#b' : 'reports',
          '#reportName' : reportName
        },
        ExpressionAttributeValues: {
          ':z': {
            report: report,
            publicUrl: report.url,
            createdAt: Date.now()
          }
        },
        ReturnValues: 'ALL_NEW'
      };

      return Observable.create( observer => {
        client.update(params, (err, data) => {
          if(err) console.log(err);
          else{
            observer.next(data)
          }
        })
      })
    }
}
