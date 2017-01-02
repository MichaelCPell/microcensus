import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { User }    from './user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user:User, private router:Router){}

  canActivate():Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    return this.user.email.map( value => {
      if(value == ""){
        this.router.navigate(["users/registration"])
        return false
      }else{
        return true
      }
    });
  }
}
