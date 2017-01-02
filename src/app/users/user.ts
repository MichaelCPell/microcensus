import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
declare var localStorage: any;
import * as _ from 'lodash';

@Injectable()
export class User {
  private _email: BehaviorSubject<string> = new BehaviorSubject("");;
  private _password:string;
  private _paid:boolean;
  // private _awsConfirmed:BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _confirmed:boolean = false;
  private _remainingLocations:BehaviorSubject<string> = new BehaviorSubject("1");
  private _awsRegistered: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _locations: BehaviorSubject<Array<object>> = new BehaviorSubject([])

  constructor(private http:Http){
  }

  get email(){
    return this._email
  }
  set email(value){
    this._email.next(value)
  }

  get confirmed(){
    return this._confirmed
  }

  set confirmed(value){
    this._confirmed = value
  }

  get remainingLocations(){
    return this._remainingLocations
  }

  set remainingLocations(value){
    this._remainingLocations.next(value)
  }

  get locations(){
    return this._locations.map( data => {
      return _.values(data)
    })
  }

  set locations(value){
    this._locations.next(value)
  }

  public updateFromDdb(userObject){
    this.locations = userObject["locations"]
    this.remainingLocations = userObject["reportCredits"] - Object.keys(userObject["locations"]).length
  }
}
