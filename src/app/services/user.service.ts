import { Injectable } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session/cognito-session.module'
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';


@Injectable()
export class UserService {

  constructor(private cognitoStore:CognitoSessionStore, private appStore:Store<fromRoot.State>) {
    cognitoStore.select("user").subscribe( 
      (x) => {
        console.log(x)
//             this.store.dispatch(new user.LoadAction(data))
      }
    )
  }

}
