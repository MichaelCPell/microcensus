import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';
import { CognitoUser } from 'amazon-cognito-identity-js'

export interface State{
    userPool: any | null;
    activeComponent: string;
}

const state: State = {
    userPool: null,
    activeComponent: "login"
}

export class CognitoSessionStore {

    constructor(){
        console.log("Session Store Loaded")
    }

      private subject = new BehaviorSubject<State>(state)
      private store = this.subject.asObservable().distinctUntilChanged(); 

      get value(){
          return this.subject.value
      }

    // select<T>(name: string): Observable<T> {
      select<T>(name: string): Observable<{}> {
          return this.store.pluck(name);
      }

      set(name:string, state:any){
          this.subject.next({
            ...this.value, [name]: state
          });
      }
}