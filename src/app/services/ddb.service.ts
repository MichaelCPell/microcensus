import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as AWS from 'aws-sdk';
import * as fromUser from '../reducers/users';
import * as user from '../actions/user';

@Injectable()
export class DynamoDBService {
    db = new AWS.DynamoDB.DocumentClient();
    
    constructor(private store:Store<fromRoot.State>) {
        console.log("DynamoDBService: constructor");

        this.store.select(fromRoot.getUserSub)
          .filter(Boolean).subscribe(
          sub => {
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
          }
        )

        //   .subscribe( (user:fromUser.State) => {
        //   console.log(`ddb got the user`)
        //   console.log(user)

        // })
    }

    public addLocation(researchArea, email){
      var params = {
        TableName: 'users_dev',
        Key: { email: email},
        ConditionExpression: 'attribute_not_exists(#a.#id)',
        UpdateExpression: 'set #a.#id = :z',
        ExpressionAttributeNames: {
          '#a' : 'locations',
          '#id' : researchArea.name
        },
        ExpressionAttributeValues: {
          ':z': {
            name: researchArea.name,
            type: researchArea.type,
            place: researchArea.place,
            geometry: researchArea.geometry,
            createdAt: Date.now(),
            reports: {}
          }
        },
        ReturnValues: 'ALL_NEW'
      }

      this.db.update(params, ((err, data) => {
        if(err) console.log(err);
        else{
          // this.user.updateFromDdb(data["Attributes"])
        }
      }))
    }

    public addReport(oData){
      var humanName = (oData.reportName + `(${oData.radius}_mi_radius)`).replace(/_/g, ' ')
          .replace(/(\w+)/g, function(match) {
            return match.charAt(0).toUpperCase() + match.slice(1);
          });
      
      var db = new AWS.DynamoDB.DocumentClient();
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
        db.update(params, (err, data) => {
          if(err) console.log(err);
          else{
            observer.next(data)
          }
        })
      })
    }
}
