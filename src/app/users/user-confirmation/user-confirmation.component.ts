import { Component, OnInit, ApplicationRef } from '@angular/core';
import {Router} from "@angular/router";
import { User } from "../user"
import { UserRegistrationService } from "../cognito.service";
import { CognitoCallback } from "../cognito.service";
import * as AWS from "aws-sdk";
@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit,  CognitoCallback {
    confirmationCode:string;
    email:string;
    errorMessage:string;

    constructor(public regService:UserRegistrationService, public router:Router, private user:User) {
    }

    ngOnInit() {
        this.errorMessage = null;
    }

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.confirmRegistration(localStorage.getItem("email"), this.confirmationCode, this);
    }

    cognitoCallback(message:string, result:any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("message: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("Moving to dashboard");

            var authenticationData = {
                Username : localStorage.getItem("email"),
                Password : localStorage.getItem("password"),
            };
            var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
            var poolData = {
                UserPoolId : 'us-east-1_T2p3nd9xA',
                ClientId : '58qe0b7458eo9705kijc7hjhv6'
            };
            var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            var userData = {
                Username : localStorage.getItem("email"),
                Pool : userPool
            };

            var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess:  ((result) => {
                    console.log(result)
                    console.log('access token + ' + result.getAccessToken().getJwtToken());

                    this.user.email = cognitoUser.username
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658', // your identity pool id here
                        Logins : {
                            // Change the key below according to the specific region your user pool is in.
                            'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
                        }
                    });

                    window.location.href = "/"

                }).bind(this),

                onFailure: function(err) {
                    alert(err);
                }

            });
        }
    }
}
