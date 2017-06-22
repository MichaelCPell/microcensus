import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

export interface State{
    userPool: any | null;
}

const state: State = {
    userPool: null
}

export class CognitoSessionStore {
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