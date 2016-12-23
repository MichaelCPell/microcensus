import { Component, OnInit } from '@angular/core';
import {AwsUtil} from "./users/aws.service";
import {UserLoginService, CognitoUtil, LoggedInCallback} from "./users/cognito.service";
import { User } from "./users/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, LoggedInCallback{

  constructor(public awsUtil:AwsUtil, public userService:UserLoginService, public cognito:CognitoUtil, private user:User) {
    console.log("AppComponent: constructor");
  }


  ngOnInit() {
    console.log("AppComponent: Checking if the user is already authenticated");
    this.userService.isAuthenticated(this);
  }

  isLoggedIn(message:string, isLoggedIn:boolean) {
    console.log("AppComponent: the user is authenticated: " + isLoggedIn);


    if(isLoggedIn){
      this.user.email = this.cognito.getCurrentUser().username
    }

    let mythis = this;
    this.cognito.getIdToken({
        callback() {

        },
        callbackWithParam(token:any) {
            // Include the passed-in callback here as well so that it's executed downstream
            console.log("AppComponent: calling initAwsService in callback")
            mythis.awsUtil.initAwsService(null, isLoggedIn, token);
        }
    });
}
}
