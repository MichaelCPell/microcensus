import { Component, OnInit } from '@angular/core';
import { User } from "./models/user";
import * as AWS from "aws-sdk";
import { CognitoUserPool, CognitoUser} from "amazon-cognito-identity-js";
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as user from './actions/user';
import * as reportTypes from './actions/report-type';
import * as locations from './actions/locations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(  
                private user:User,
                private angulartics:Angulartics2GoogleAnalytics,
                private store: Store<fromRoot.State>) {
    console.log("AppComponent: constructor");
  }


  ngOnInit() {

      var data = {
          UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
          ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
      };
    //   var userPool:CognitoUserPool = new CognitoUserPool(data);
    //   var cognitoUser:CognitoUser = userPool.getCurrentUser();

    //   if (cognitoUser != null) {
    //       cognitoUser.getSession((function(err, session) {
    //           if (err) {
    //              alert(err);
    //               return;
    //           }
    //           console.log('session validity: ' + session.isValid());
    //           this.user.email = cognitoUser.getUsername()
    //           AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //               IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
    //               Logins : {
    //                   'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : session.getIdToken().getJwtToken()
    //               }
    //           });

    //           var db = new AWS.DynamoDB.DocumentClient({
    //             params: {TableName: 'users'}
    //           });

    //           db.get({TableName: 'users', Key: {email: this.user.email}}, ((err, data) => {
    //             if(err){
    //               console.log(err)
    //             }
    //             this.store.dispatch(new user.LoadAction(data))
    //             this.store.dispatch(new reportTypes.AddAction(data.Item.privateReportTypes))
    //             this.store.dispatch(new locations.SetAction(data.Item.locations))
    //           }).bind(this))
    //       }).bind(this));
    //   }

  }

}
