import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {Router} from "@angular/router";
import {UserLoginService} from "../../users/cognito.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router:Router, public user:User, private userLogin:UserLoginService) { }

  ngOnInit() {
  }

  public signOut(){
    this.user.email = null
    this.userLogin.logout()
    this.router.navigate(["/"]);
  }


}
