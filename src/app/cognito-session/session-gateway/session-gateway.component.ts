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
  error$:Observable<{}>;
  activeComponent:string;
  email$:Observable<string>;
  notice$:Observable<string | {}>;

  constructor(private store:CognitoSessionStore, 
              private loginService:UserLoginService,
              private registrationService:UserRegistrationService) { 
      this.login = (credentials) => {
        this.store.set("notice", "We are currently logging you in.  This may take a moment.")
        loginService.authenticate(credentials.email, credentials.password)
      }

      this.register = (credentials) => {
        this.store.set("notice", "We are currently registering you.  This may take a moment.")
        registrationService.register(credentials)
      }

      this.confirm = (credentials) => {
        this.registrationService.confirmRegistration(credentials.email, credentials.code)
      }

      this.store.select("activeComponent").subscribe(
        (next:string) => {
          this.store.set("notice", "")
          this.activeComponent = next;
        }
      )

      this.email$ = this.store.select("credentials")
        .filter(Boolean)
        .map( credentials => {
          this.email = credentials["email"];
          return credentials["email"]
        })

      this.notice$ = this.store.select("notice")
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
      case "gotoConfirm": {
        this.store.set("activeComponent", "confirm");
        break;
      }
    }
  }

  logout(){
    this.loginService.logout();
  }

  resendCode(email?){
    if(email){
      this.store.set("credentials", new RegistrationUser(email))
      this.registrationService.resendCode(email)
    }else{
      this.store.set("notice", "Please enter your e-mail address first.")            
    }
  }

  startResetPassword(email){
    if(email){
      this.loginService.forgotPassword(email)
    }else{
      this.store.set("notice", "Please enter your e-ng s  mail address first.")
    }
  }

  resetPassword(creds){
    this.store.set("notice", "")
    console.log(creds)
    if(!creds.email){
      this.store.set("notice", "Please enter an e-mail address.")
      return
    }

    if(!creds.resetCode){
      this.store.set("notice", "Reset code is missing.")
      return
    }

    if(!creds.password){
      this.store.set("notice", "Password is missing.")
      return
    }

    if(creds.password != creds.passwordConfirmation){
      this.store.set("notice", "Passwords do not match.")
      return
    }
  } 
}
