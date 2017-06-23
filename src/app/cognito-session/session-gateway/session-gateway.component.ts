import { Component, OnInit } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session.store';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { UserLoginService } from '../cognito.service';
import { ICognitoUserData } from 'amazon-cognito-identity-js';


@Component({
  selector: 'app-session-gateway',
  templateUrl: './session-gateway.component.html',
  styleUrls: ['./session-gateway.component.css']
})
export class SessionGatewayComponent implements OnInit {
  login;
  email:string;

  constructor(private store:CognitoSessionStore, 
              private loginService:UserLoginService) { 
      this.login = (credentials) => {
          loginService.authenticate(credentials.email, credentials.password)
      }

      this.store.select("user").subscribe(
        (user:ICognitoUserData) => {
            console.log("New User has been broadcast")
            console.log(user)
            this.email = user["username"];
        }
      )

      this.store.select("session").subscribe(
        (user:ICognitoUserData) => {
            console.log("New Session has been broadcast")
        }
      )
  }

  ngOnInit() {}

}
