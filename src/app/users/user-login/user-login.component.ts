import { Component, OnInit } from '@angular/core';
import { RegistrationUser } from "../registration-user";
import * as AWS from "aws-sdk";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { User } from "../user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  registrationUser:RegistrationUser = new RegistrationUser();;

  constructor(private user:User, private router:Router) { }

  ngOnInit() {
  }

  public submit(){
      this.login(this.registrationUser.email, this.registrationUser.password)
  }

  private login(email, password){
    var authenticationData = {
        Username : email,
        Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
        ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : email,
        Pool : userPool
    };
    var host = this;
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess:  ((result) => {
            console.log(result)
            console.log('access token + ' + result.getAccessToken().getJwtToken());


            // this.user.email = cognitoUser.getUsername()
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
                }
            });


            var db = new AWS.DynamoDB.DocumentClient({
              params: {TableName: 'users'}
            });

            db.get({TableName: 'users', Key: {email: cognitoUser.getUsername()}}, ((err, data) => {
              if(err){
                console.log(err)
              }
              console.log(data)
            //   this.user.updateFromDdb(data["Item"]);
              this.router.navigate(["users/dashboard"]);

            }).bind(this))
        }).bind(this),

        onFailure: function(err) {
            alert(err);
        },

    });
  }
}
