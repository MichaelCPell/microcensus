import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class SessionService {
  private _currentUser:User = {};

  constructor() {
  }


  get user(){
    return this._currentUser
  }

  set user(user:User){
    this._currentUser = user;
  }



}
