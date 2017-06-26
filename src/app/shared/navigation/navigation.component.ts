import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user$:Observable<User>
  creditsRemaining:number = 0;
  email:string;

  constructor(private store:Store<fromRoot.State>, private router:Router) {
    this.user$ = store.select(fromRoot.getUser);


    this.user$
      .subscribe( (user) => {
        console.log(`Navigation saw a user ${JSON.stringify(user)}`)
        if(user){
          this.email = user.email
        }else{
          console.log("Signout")
          this.email = undefined;
        }
      })
  }

  ngOnInit() {
  }

  public signOut(){
    // this.user.email = null
    // this.userLogin.logout()
    this.router.navigate(["/"]);
  }

}
