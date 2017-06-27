import { Injectable } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session/cognito-session.module'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import * as fromRoot from '../reducers';
import * as user from '../actions/user';
import { User } from './../models/user'

@Injectable()
export class UserService {
  user$:Observable<any>;
  constructor(private cognitoStore:CognitoSessionStore, 
              private appStore:Store<fromRoot.State>,
              private router:Router) {
    
    this.user$ = cognitoStore.select("user").distinctUntilChanged()
    
    this.user$.subscribe( 
      (data) => {
        if(data){
          this.appStore.dispatch(new user.LoadAction(new User(data.username)))
          this.router.navigate(["/"])
        }else{
          this.appStore.dispatch(new user.SignoutAction(undefined))
        }
      }
    )
  }

}
