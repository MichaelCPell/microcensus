import {Injectable} from "@angular/core";
import {Stuff} from "./user-activity/user-activity.component";
import {User} from "../users/user"

declare var AWS:any;
declare var AWSCognito:any;

@Injectable()
export class DynamoDBService {

    constructor(private user:User) {
        console.log("DynamoDBService: constructor");
    }

    public addLocation(address, email){
      console.log(email)


      var db = new AWS.DynamoDB.DocumentClient();

      var params = {
        TableName: 'users',
        Key: { email: email},
        UpdateExpression: 'set #a[9999999] = :z',
        ExpressionAttributeNames: {'#a' : 'locations'},
        ExpressionAttributeValues: {
          ':z': {
            address: address,
            createdAt: Date.now()
          }
        },
        ReturnValues: 'ALL_NEW'
      }

      db.update(params, (err, data) => {
        if(err) console.log(err);
        else{
          this.user.updateFromDdb(data["Attributes"])
        }

      })
    }

}
