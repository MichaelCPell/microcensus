import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}



  canActivate():boolean {
    return true
  }
  // canActivate():Observable<boolean> {
  //   console.log('AuthGuard#canActivate called');
  //   return true
  //   // return this.user.email.map( (value => {
  //   //   if(value == ""){
  //   //     this.router.navigate(["users/registration"])
  //   //     return false
  //   //   }else{
  //   //     return true
  //   //   }
  //   // }).bind(this));
  // }
}
