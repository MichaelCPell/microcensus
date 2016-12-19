import { Injectable } from '@angular/core';
import {RxHttpRequest} from 'rx-http-request';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
  ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
import {Observable} from 'rxjs/Observable';

@Injectable()
export class User {
  private _email:string;
  private _password:string;
  private _needsRegistration:boolean;
  private _paid:boolean = false;
  private _confirmed:string;


  constructor(){}

  get email(){
    return this._email;
  }

  set email(value){
    return this._email = value;
  }

  set password(value){
    return this._password = value;
  }

  get paid(){
    return this._paid;
  }
  set paid(value){
    this._paid = true;
  }

  get remainingReports(){
    return this._remainingReports;
  }



  set confirmed(value){
    this._confirmed = value;
  }

  public create(){
    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : this.email
    };

    return Observable.create( (observer) => {
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      console.log(this)

      userPool.signUp(this.email, this._password, attributeList, null, function(err, result){
        if (err) {
          observer.error(err);
          return;
        }

        console.log(result)
        observer.next(result);
      });
    })
  }

  public authenticate(){
    var authenticationData = {
           Username : this.email,
           Password : this._password
     };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var userData = {
        Username : this.email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return Observable.create( (observer) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            observer.next(result);
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
                Logins : {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
                }
            });
            cognitoUser.cacheTokens();
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
        },
        onFailure: function(err) {
          observer.error(err)
        }
      })
    });
  }

  public verify(code){
      var userData = {
          Username : this.email,
          Pool : userPool
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


      return Observable.create( (observer) => {
        cognitoUser.confirmRegistration(code, false, function(err, msg){
          if(err){
            console.log("Error" + err)
            return
          }
          observer.next(msg)
        })
      })

  }


  public reload(callback){
    return RxHttpRequest.get(`https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/users/${this.email}`).subscribe(
      (data) => {
        if (data.response.statusCode === 200) {
            this.setAttributesFromDb(JSON.parse(data.body)["Item"]);

            callback();
        }
      },
      (err) => console.error(err)
    );
  }

  private setAttributesFromDb(data){
    this._paid = data["paid"]["S"]
    this._remainingReports = data["remaining_reports"]["N"]
  }

}
