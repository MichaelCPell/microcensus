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
  private _userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  private s3;
  private db;
  constructor() { }

  get cognitoUser(){
    return this._cognitoUser;
  }

  set cognitoUser(value){
   this._cognitoUser = value;
  }

  public getSession(callback){
    this.cognitoUser = this._userPool.getCurrentUser();
    if (this.cognitoUser != null) {
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

          callback(this.cognitoUser)
      });
    }
  }

  public createUser(email:string, password:string){
    console.log("Called")
    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : email
    };
    var host = this;
    return Observable.create( (observer) => {
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      host._userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log(err)
          observer.error(err);
          return;
        }
        host.cognitoUser = result.user;
        observer.next(result);
      });
    }).share()
  }

  public authenticateUser(email:string, password:string){
    var authenticationData = {
           Username : email,
           Password : password
     };

     var userData = {
         Username : email,
         Pool : this._userPool
     };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    return Observable.create( (observer) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess:  (result) => {
            this.cognitoUser = this._userPool.getCurrentUser();
            observer.next(this.getSession());
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
                Logins : {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
                }
            });
            cognitoUser.cacheTokens();

        },
        onFailure: function(err) {
          observer.error(err)
        }
      })
    });
  }

  public signOut(){
    if(this._cognitoUser == undefined) this._cognitoUser = this._userPool.getCurrentUser();
    this._cognitoUser.signOut();
  }

  public verifyUser(code, callback){
    this.cognitoUser.confirmRegistration(code, true, callback);
  }

  public reloadUser(){
    var host = this;
    return Observable.create( (observer) => {
      host.db.getItem({Key: {email: {S: this.cognitoUser.username}}}, (err, data) => {
        observer.next(data)
      })
    }).share();
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
