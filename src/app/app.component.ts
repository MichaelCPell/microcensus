import { Component, OnInit } from '@angular/core';
import {AwsUtil} from "./users/aws.service";
import {UserLoginService, CognitoUtil, LoggedInCallback} from "./users/cognito.service";
import { User } from "./users/user";
import * as AWS from "aws-sdk";
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{

  constructor(  public awsUtil:AwsUtil, 
                public userService:UserLoginService, 
                public cognito:CognitoUtil, 
                private user:User,
                private angulartics:Angulartics2GoogleAnalytics) {
    console.log("AppComponent: constructor");
  }


  ngOnInit() {

      var data = {
          UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
          ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
      };
      var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
          cognitoUser.getSession((function(err, session) {
              if (err) {
                 alert(err);
                  return;
              }
              console.log('session validity: ' + session.isValid());
              this.user.email = cognitoUser.username
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
                  Logins : {
                      'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : session.getIdToken().getJwtToken()
                  }
              });

              var db = new AWS.DynamoDB.DocumentClient({
                params: {TableName: 'users'}
              });

              db.get({Key: {email: cognitoUser.username}}, ((err, data) => {
                if(err){
                  console.log(err)
                }
                console.log(data)
                this.user.updateFromDdb(data["Item"])
              }).bind(this))
          }).bind(this));
      }

  }

}
