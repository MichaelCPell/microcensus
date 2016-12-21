import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { AWSService } from "./aws.service";
import {Observable} from 'rxjs/Observable';
declare var localStorage: any;

@Injectable()
export class User {
  private _email:string;
  private _password:string;
  private _paid:boolean;
  private _awsConfirmed:string;
  private _remainingReports:string;
  private _awsRegistered:string;

  constructor(private aws:AWSService, private http:Http){

    this.loadFromStorage();

    if(this.email){
      console.log(this)
      if(this._awsConfirmed){
        // this.reload()
      }
    }else{
      console.log(this);
    }
    // Storage.getItem("microcensus")
    // this.aws.getSession((data) => {
    //   console.log(data)
    //   this.email = data["Item"]["email"]["S"]
    //   this.remainingReports = data["Item"]["reportCredits"]["N"]
    // })
  }

  get email(){
    return this._email
  }

  get confirmed(){
    return this._awsConfirmed == "true"
  }

  public create(email, password){
    localStorage.setItem("email", email)
    localStorage.setItem("awsConfirmed", false)
    localStorage.setItem("awsRegistered", false)
    this.loadFromStorage()

    var callback = (cognitoUser) => {
      localStorage.setItem("awsRegistered", true)
      console.log(cognitoUser)
    }

    return Observable.create( (observer) => {
      this.aws.createUser(this._email, password, callback)
    })
  }

  public confirm(code){
    var host = this;
    var o = Observable.create( (observer) => {
      this.aws.verifyUser(code, this.email, () => {
        observer.next("Verified")
      })
    }).share()

    o.subscribe(
      (next) => {
        console.log(next)
        host._awsConfirmed = true;
        localStorage.setItem("awsConfirmed", true)
      }
    )

    return o;
  }

  public reload(){
    this.aws.reloadUser((err, result) => {
      console.log(result)
    })
  }

  public signOut(){
    localStorage.clear()
    this._email = null
  }

  private loadFromStorage(){
    this._email = localStorage.getItem("email");
    this._awsConfirmed = localStorage.getItem("awsConfirmed");
    this._awsRegistered = localStorage.getItem("awsRegistered");
  }
}
