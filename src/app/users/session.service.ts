import { Injectable } from '@angular/core';
import { User } from './user';
import { AWSService } from './aws.service';
import {Subscriber} from "rxjs/Subscriber";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SessionService {
  private _currentUser:User;

  constructor(private aws:AWSService, private _user:User) {
    this.checkForSession();
  }

  get user(){
    return this._user
  }

  set user(user:User){
    this._user = user;
  }

  checkForSession() {
    this.aws.getSession().subscribe(
      next => {
        this.user.email = next
      },
      error => {
        console.log(error)
      }
    )
  }

  public signOut(){
    this.aws.signOut()
    this.user.email = null;
  }
}
