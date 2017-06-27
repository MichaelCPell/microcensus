import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';
import { CognitoUser } from 'amazon-cognito-identity-js'
import { RegistrationUser } from './registration-user'

export interface State{
    userPool: any;
    activeComponent: string;
    credentials: RegistrationUser;
    notice:string;
}

const state: State = {
    userPool: null,
    activeComponent: "reset",
    credentials: null,
    notice: null
}

export class CognitoSessionStore {

    constructor(){
    }

      private subject = new BehaviorSubject<State>(state)
      private store = this.subject.asObservable().distinctUntilChanged(); 

      get value(){
          return this.subject.value
      }

    // select<T>(name: string): Observable<T> {
      select<T>(name: string): Observable<{}> {
          return this.store.pluck(name).distinctUntilChanged();
      }

      set(name:string, state:any){
          this.subject.next({
            ...this.value, [name]: state
          });
      }
}