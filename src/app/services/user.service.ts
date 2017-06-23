import { Injectable } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session/cognito-session.module'
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as user from '../actions/user';

@Injectable()
export class UserService {

  constructor(private cognitoStore:CognitoSessionStore, private appStore:Store<fromRoot.State>) {
    // cognitoStore.select("user").subscribe( 
    //   (data) => {
    //     this.appStore.dispatch(new user.LoadAction(data))
    //   }
    // )
  }

}
