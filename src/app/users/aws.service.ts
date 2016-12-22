import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as AWS from 'aws-sdk';


var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
  ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
};

@Injectable()
export class AWSService {
  private _cognitoUser;
  private _userPool;
  private s3;
  private db;
  private _email;
  private _password;


  constructor() {
    this._userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    this._cognitoUser = this._userPool.getCurrentUser();
  }

  get cognitoUser(){
    return this._cognitoUser;
  }

  set cognitoUser(value){
   this._cognitoUser = value;
  }

  public getSession(callback){
    var userData = {
        Username : localStorage.getItem("email"),
        Pool : this._userPool
    };

   this._cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    var authenticationData = {
           Username : localStorage.getItem("email")
           Password : localStorage.getItem("sessionToken")
     };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);



    this._cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess:  (result) => {
          console.log("Flag 0")
          this.cognitoUser.getSession((err, session) => {
              if (err) {
                 alert(err);
                  return;
              }
              console.log('session validity: ' + session.isValid());
              AWS.config.region = 'us-east-1'; // Region
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
                  Logins: {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : session.getIdToken().getJwtToken()
                  }
              });

              this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {Bucket: "deletelater123"}
              });

              this.db = new AWS.DynamoDB({
                params: {TableName: 'users'}
              });

              this.db.getItem({Key: {email: {S: this.cognitoUser.username}}}, (err, data) => {
                callback(data)
              })
          });
      },
      onFailure: function(err) {
        console.log(err)
      }
    })
  }

  public createUser(email:string, password:string, callback){
    console.log(`Flag Two: ${email}, ${password}`)
    this._email = email
    this._password = password
    localStorage.setItem("sessionToken", password)
    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : email
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    this._userPool.signUp(this._email, this._password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err)
        return;
      }
      this.cognitoUser = result.user;

      console.log(`Flag Three`)
      callback(this.cognitoUser)

    });

  }

  public authenticateUser(email:string, password:string){
    if(!this.cognitoUser){
      var userData = {
          Username : this._email,
          Pool : this._userPool
      };

     this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    }

    var authenticationData = {
           Username : email,
           Password : password
     };


    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess:  (result) => {
          console.log("Flag 0")
          // this.cognitoUser = this._userPool.getCurrentUser();
          // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          //     IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
          //     Logins : {
          //         'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
          //     }
          // });
          // cognitoUser.cacheTokens();

      },
      onFailure: function(err) {
        console.log(err)
      }
    })
  }

  public signOut(){
    this._cognitoUser = this._userPool.getCurrentUser();
    this._cognitoUser.signOut();
  }

  public verifyUser(code, email, callback){

    if(!this.cognitoUser){
       var userData = {
           Username : email,
           Pool : this._userPool
       };
      this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    }

    this.cognitoUser.confirmRegistration(code, true, callback);
  }

  public publishReport(file){
    return Observable.create((function(observer) {
      this.s3.upload({
        Bucket: "reports.themicrocensus.com",
        Key: file.name + ".html",
        Body: file,
        ACL: 'public-read',
        ContentType: 'text/html'
      }, (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        observer.next(data)
      });
    }).bind(this));
  }
}
