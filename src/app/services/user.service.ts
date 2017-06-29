import { Injectable } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session/cognito-session.module'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import * as fromRoot from '../reducers';
import * as user from '../actions/user';
import { User } from './../models/user';
import { AwsService } from  './aws.service'

@Injectable()
export class UserService {
  user$:Observable<any>;
  constructor(private cognitoStore:CognitoSessionStore, 
              private appStore:Store<fromRoot.State>,
              private router:Router,
              private aws:AwsService) {
    
    this.user$ = cognitoStore.select("user").distinctUntilChanged()
    
    this.user$.subscribe( 
      (data) => {
        if(data){
          data.getUserAttributes( (err, data) => {
            this.appStore.dispatch(new user.SetSubAction({sub: data[0].getValue()}))
          })

          data.getSession( (err, session) => {
            this.aws.configAWS(session.getIdToken().getJwtToken())
          })
          
          this.router.navigate(["/"])
        }else{
          this.appStore.dispatch(new user.SignoutAction(undefined))
        }
      }
    )
  }

}
