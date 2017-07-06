import { Injectable } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session/cognito-session.module'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import * as fromRoot from '../reducers';
import * as user from '../actions/user';
import { User } from './../models/user';
import { AwsService } from  './aws.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Injectable()
export class UserService {
  user$:Observable<any>;
  constructor(private cognitoStore:CognitoSessionStore, 
              private appStore:Store<fromRoot.State>,
              private router:Router,
              private aws:AwsService,
              private angulartics:Angulartics2GoogleAnalytics) {
    
    this.user$ = cognitoStore.select("user").distinctUntilChanged()
    
    this.user$.subscribe( 
      (data) => {
        if(data){

          this.angulartics.eventTrack("New Session Event", {
            category: 'User'
          });

          data.getSession( (err, session) => {
            this.aws.configAWS(session.getIdToken().getJwtToken())

            data.getUserAttributes( (err, data) => {
              this.appStore.dispatch(new user.SetSubAction({sub: data[0].getValue()}))
            })
          })
          
          this.router.navigate(["/"])
        }else{
          this.aws.configUnauthUser();
          this.appStore.dispatch(new user.SignoutAction(undefined))
        }
      }
    )
  }

}
