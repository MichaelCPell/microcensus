import {Injectable} from "@angular/core";
import {User} from "../users/user";
import {Observable} from "rxjs/Observable";

declare var AWS:any;
declare var AWSCognito:any;

@Injectable()
export class DynamoDBService {

    constructor(private user:User) {
        console.log("DynamoDBService: constructor");
    }

    public addLocation(researchArea, email){
      var db = new AWS.DynamoDB.DocumentClient();
      var params = {
        TableName: 'users',
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

      db.update(params, ((err, data) => {
        if(err) console.log(err);
        else{
          this.user.updateFromDdb(data["Attributes"])
        }
      })
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
