import { Injectable } from '@angular/core';
import {RxHttpRequest} from 'rx-http-request';
import { AWSService } from "./aws.service";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class User {
  private _email:string;
  private _password:string;
  private _needsRegistration:boolean;
  private _paid:boolean = false;
  private _confirmed:string;


  constructor(private aws:AWSService){}

  get email(){
    return this._email;
  }

  set email(value){
    return this._email = value;
  }

  set password(value){
    return this._password = value;
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

  public create(): Observable{
    return this.aws.createUser(this.email, this._password);
  }

  public authenticate(): Observable{
    return this.aws.authenticateUser(this.email, this._password);
  }

  public verify(code): Observable{
    return this.aws.verifyUser(code);
  }

  public reload(callback){
    return RxHttpRequest.get(`https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/users/${this.email}`).subscribe(
      (data) => {
        if (data.response.statusCode === 200) {
            this.setAttributesFromDb(JSON.parse(data.body)["Item"]);

            callback();
        }
      },
      (err) => console.error(err)
    );
  }

  private setAttributesFromDb(data){
    this._paid = data["paid"]["S"]
    this._remainingReports = data["remaining_reports"]["N"]
  }

}
