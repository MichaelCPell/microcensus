import { Component, OnInit } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session.store';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { UserLoginService, UserRegistrationService } from '../cognito.service';
import { ICognitoUserData } from 'amazon-cognito-identity-js';
import { RegistrationUser } from '../registration-user'

@Component({
  selector: 'app-session-gateway',
  templateUrl: './session-gateway.component.html',
  styleUrls: ['./session-gateway.component.css']
})
export class SessionGatewayComponent implements OnInit {
  login;
  register;
  confirm;
  email:string;
  activeComponent:string;
  email$:Observable<string>;

  constructor(private store:CognitoSessionStore, 
              private loginService:UserLoginService,
              private registrationService:UserRegistrationService) { 
      this.login = (credentials) => {
        loginService.authenticate(credentials.email, credentials.password)
      }

      this.register = (credentials) => {
        registrationService.register(credentials)
      }

      this.confirm = (credentials) => {
        this.registrationService.confirmRegistration(credentials.email, credentials.code)
      }

      this.store.select("activeComponent").subscribe(
        (next:string) => {
          this.activeComponent = next;
        }
      )

      this.store.select("user")
        .filter(Boolean)
        .subscribe(
          (user:ICognitoUserData) => {
              this.email = user["username"];
          }
        )

      this.email$ = this.store.select("credentials")
        .filter(Boolean)
        .map( credentials => {
          console.log(credentials)
          return credentials["email"]
        })

      this.store.select("session").subscribe(
        (session) => {
            console.log("New Session has been broadcast")
            console.log(session)
        }
      )   
  }

  ngOnInit() {}

  handleClick(event){
    switch(event){
      case "gotoRegister": {
        this.store.set("activeComponent", "register");
        break;
      }
      case "gotoLogin": {
        this.store.set("activeComponent", "login");
        break;
      }
    }
  }

  logout(){
    this.loginService.logout();
  }

}
