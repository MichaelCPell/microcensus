import { Injectable } from '@angular/core';
import { User } from './user';
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
  ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var cognitoUser = userPool.getCurrentUser();

@Injectable()
export class SessionService {
  private _currentUser:User = new User("")

  constructor() {
    this.checkForSession();
  }

  checkForSession() {
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
          if (err) {
             alert(err);
              return;
          }
          console.log('session validity: ' + session.isValid());
          if(session.isValid()){
            this.user = new User(cognitoUser.username)
          }
      });
    }
  }


  get user(){
    return this._currentUser
  }

  set user(user:User){
    this._currentUser = user;
  }


  public signOut(){
    if(cognitoUser == undefined) cognitoUser = userPool.getCurrentUser();
    cognitoUser.signOut();
    this.user = new User("");
  }
}
