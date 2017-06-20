import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
declare var localStorage: any;
import * as _ from 'lodash';

@Injectable()
export class User {
  private _email: BehaviorSubject<string> = new BehaviorSubject("");
  private _password:string;
  private _paid:boolean;
  // private _awsConfirmed:BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _confirmed:boolean = false;
  private _remainingLocations:BehaviorSubject<number> = new BehaviorSubject(1);
  private _awsRegistered: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _locations:any = new BehaviorSubject([])
  public privateReportTypes:object[] = [];
  public isCustomer;



  constructor(private http:Http){
  }

  get email(){
    return this._email.getValue();
  }

  set email(value:string){
    this._email.next(value)
  }

  get confirmed(){
    return this._confirmed
  }

  set confirmed(value){
    this._confirmed = value
  }

  set remainingLocations(value:number){
    this._remainingLocations.next(value)
  }

  get locations(){
    return this._locations.map( data => {
      return _.values(data)
    })
  }

  set locations(value:Array<object>){
    this._locations.next(value)
  }

  // set privateReportTypes(value:Array<object>){
  //   this._privateReportTypes.next(value)
  // }

  public updateFromDdb(userObject){
    this.locations = userObject["locations"]
    this._remainingLocations.next(userObject["locationCredits"] - Object.keys(userObject["locations"])["length"])
    this.isCustomer = userObject["isCustomer"]
    this.privateReportTypes = userObject["privateReportTypes"]
    console.log("Loaded User")
  }
}
