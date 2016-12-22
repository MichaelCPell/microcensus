import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { AWSService } from "./aws.service";
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
declare var localStorage: any;

@Injectable()
export class User {
  private _email: BehaviorSubject<string> = new BehaviorSubject("");;
  private _password:string;
  private _paid:boolean;
  private _awsConfirmed:BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _remainingLocations:BehaviorSubject<string> = new BehaviorSubject("1");
  private _awsRegistered: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private aws:AWSService, private http:Http){
    this.loadFromStorage();
  }

  get email(){
    return this._email.asObservable()
  }
  set email(value){
    this._email.next(value)
  }

  get confirmed(){
    return this._awsConfirmed.asObservable()
  }
  set confirmed(value){
    this._awsConfirmed.next(value)
    if(value == true || value == "true"){
      this.refreshSession((data) => {
        this.remainingLocations = data["Item"]["reportCredits"]["N"]
      })
    }
  }

  get registered(){
    return this._awsRegistered.asObservable()
  }
  set registered(value){
    this._awsRegistered.next(value)
  }

  get remainingLocations(){
    return this._remainingLocations.asObservable()
  }
  set remainingLocations(value){
    this._remainingLocations.next(value)
  }

  get paid(){
    return this._paid
  }

  public create(email, password){
    localStorage.setItem("email", email)
    localStorage.setItem("awsConfirmed", false)
    localStorage.setItem("awsRegistered", false)
    this.loadFromStorage()

    var host = this;
    var callback = (cognitoUser) => {
      console.log(cognitoUser)
      localStorage.setItem("awsRegistered", true)
      host.registered = true
    }

    this.aws.createUser(this._email.getValue(), password, callback)
  }

  public confirm(code){
    var host = this;
    this.aws.verifyUser(code, this._email.getValue(), () => {
      host.confirmed = true;
      localStorage.setItem("awsConfirmed", true)
    })
  }

  public refreshSession(cb){
    this.aws.getSession(cb)
  }


  public signOut(){
    localStorage.clear()
    this.email = null
    this.email = null
  }

  public authenticate(){

  }


  // Private Methods ==============================================================================

  private loadFromStorage(){
    this.email = localStorage.getItem("email");
    this.confirmed = localStorage.getItem("awsConfirmed");
    this.registered = localStorage.getItem("awsRegistered");
  }
}
