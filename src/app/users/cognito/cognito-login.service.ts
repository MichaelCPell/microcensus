import {Injectable} from '@angular/core';
import { CognitoCallback } from "./callback-interfaces";
import * as AWS from 'aws-sdk';
import { AWSService } from '../aws.service';
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Injectable()
export class CognitoLoginService{

  constructor(){

  }

  authenticate(username:string, password:string, userPool:any, callback:CognitoCallback){
    console.log("UserLoginService: starting the authentication")
    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWS.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

    let authenticationData = {
        Username: username,
        Password: password,
    };
    let authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    let userData = {
        Username: username,
        Pool: userPool
    };

    console.log("UserLoginService: Params set...Authenticating the user");
    let cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
    console.log("UserLoginService: config is " + AWS.config);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

            // Add the User's Id Token to the Cognito credentials login map.
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: "us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658",
                Logins: {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA': result.getIdToken().getJwtToken()
                }
            });

            // console.log("UserLoginService: set the AWS credentials - " + JSON.stringify(AWS.config.credentials));
            // // debugger
            // console.log("UserLoginService: set the AmazonCognitoIdentity credentials - " + JSON.stringify(AWS.config.credentials));
            callback.cognitoCallback(null, result);
        },
        onFailure: function (err) {
            callback.cognitoCallback(err.message, null);
        },
    });
  }




  //
  // public authenticateUser(email:string, password:string){
  //
  //   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  //
  //   cognitoUser.authenticateUser(authenticationDetails, {
  //     onSuccess:  (result) => {
  //         console.log("Flag 0")
  //         // this.cognitoUser = this._userPool.getCurrentUser();
  //         // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //         //     IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
  //         //     Logins : {
  //         //         'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
  //         //     }
  //         // });
  //         // cognitoUser.cacheTokens();
  //
  //     },
  //     onFailure: function(err) {
  //       console.log(err)
  //     }
  //   })
  // }





}
