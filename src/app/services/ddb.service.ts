import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Observable} from "rxjs";
import { Store } from "@ngrx/store";
import { AwsService } from './aws.service'
import * as fromRoot from '../reducers';
import * as fromUser from '../reducers/user.reducer';
import * as locations from '../actions/locations';
import * as user from '../actions/user';

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
                  return
                }

                let newUser = new User(data.Item.email, data.Item.locations, data.Item.reportTypes)
                this.store.dispatch(new user.LoadAction(newUser))
              })
            })

          this.store.select(fromRoot.getReport)
            .filter( (report, i) => !!report.url)
            .combineLatest(this.store.select(fromRoot.getUserState))
            .subscribe(
              report => {
                this.db = new awsService.AWS.DynamoDB.DocumentClient();
                this.addLocation(this.db, report[0], report[1])
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


      return client.update(params, (err, data) => {
        if(err){
          console.log(err);
        } 
        else{
          const action = new locations.SetAction(data.Attributes.locations)
          this.store.dispatch(action)
        }
      })
    }

    public addReport(oData){
      var humanName = (oData.reportName + `(${oData.radius}_mi_radius)`).replace(/_/g, ' ')
          .replace(/(\w+)/g, function(match) {
            return match.charAt(0).toUpperCase() + match.slice(1);
          });
      
      var params = {
        TableName: 'users',
        Key: { email: oData.email},
        UpdateExpression: 'set #a.#id.#b.#reportName = :z',
        ExpressionAttributeNames: {
          '#a' : 'locations',
          '#id' : oData.address,
          '#b' : 'reports',
          '#reportName' : oData.reportName + `(${oData.radius}_mi_radius)`
        },
        ExpressionAttributeValues: {
          ':z': {
            reportName: humanName,
            publicUrl: `http://${oData.Bucket}/${oData.key}`,
            createdAt: Date.now()
          }
        },
        ReturnValues: 'ALL_NEW'
      };

      return Observable.create( observer => {
        this.db.update(params, (err, data) => {
          if(err) console.log(err);
          else{
            observer.next(data)
          }
        })
      })
    }
}
