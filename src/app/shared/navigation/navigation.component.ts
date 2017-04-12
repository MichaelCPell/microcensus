import { Component, OnInit } from '@angular/core';
import { User } from '../../users/user';
import { Router } from "@angular/router";
import { UserLoginService } from "../../users/cognito.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public user:User, private router:Router, private userLogin:UserLoginService) { }

  ngOnInit() {
  }

  public signOut(){
    this.user.email = null
    this.userLogin.logout()
    this.router.navigate(["/users/registration"]);
  }

}
