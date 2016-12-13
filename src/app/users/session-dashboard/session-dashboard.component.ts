import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-dashboard',
  templateUrl: './session-dashboard.component.html',
  styleUrls: ['./session-dashboard.component.css']
})
export class SessionDashboardComponent implements OnInit {
  public newUser:string = "Andrea";


  constructor() { }

  ngOnInit() {
  }


  public createUser(){
    console.log(this.newUser.name);
  }


  public createUserX(){
    console.log("Full Steam Ahead")
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    var poolData = {
      UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
      ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : 'email@mydomain.com'
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp('username2', 'password', attributeList, null, function(err, result){
      if (err) {
        console.log(err);
        return;
      }
      console.log(result)
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
    });

  }

}
