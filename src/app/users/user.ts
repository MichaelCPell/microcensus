import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { AWSService } from "./aws.service";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class User {
  private _email:string;
  private _password:string;
  private _needsRegistration:boolean;
  private _paid:boolean = false;
  private _confirmed:string;
  private _remainingReports:string;

  constructor(private aws:AWSService, private http:Http){}

  get email(){
    return this._email;
  }

  set email(value){
    this._email = value;
  }

  set password(value){
    this._password = value;
  }

  get paid(){
    return this._paid;
  }
  set paid(value){
    this._paid = true;
  }

  get remainingReports(){
    return this._remainingReports;
  }

  set confirmed(value){
    this._confirmed = value;
  }

  public create(): Observable<any>{
    return this.aws.createUser(this.email, this._password);
  }

  public authenticate(): Observable<any>{
    return this.aws.authenticateUser(this.email, this._password);
  }

  public reload(callback){
    return this.http.get(`https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/users/${this.email}`)
      .map((res:Response) => res.json())
      .subscribe(
        (data) => {
          this.setAttributesFromDb(data["Item"]);
          callback();
        },
        (err) => console.error(err)
    );
  }

  private setAttributesFromDb(data){
    this._paid = data["paid"]["S"]
    this._remainingReports = data["remaining_reports"]["N"]
  }

  public verify(code, callback){
    this.aws.verifyUser(code, (err, result) => {
        if (err) {
            alert(err);
            return;
        }

        callback(result)
    })
  }

}
