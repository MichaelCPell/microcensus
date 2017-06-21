import { Component, OnInit } from '@angular/core';
import { User } from '../../users/user';
import { Router } from "@angular/router";
import { UserLoginService } from "../../users/cognito.service";
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

  constructor(private store:Store<fromRoot.State>, private router:Router, private userLogin:UserLoginService) {
    this.user$ = store.select(fromRoot.getUser);


    this.user$
      .filter(Boolean)
      .map(user => user["Item"])
      .subscribe( (user) => {

      })
  }

  ngOnInit() {
  }

  public signOut(){
    // this.user.email = null
    this.userLogin.logout()
    this.router.navigate(["/"]);
  }

}
