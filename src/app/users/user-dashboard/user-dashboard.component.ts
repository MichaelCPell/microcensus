import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router:Router, public user:User) { }

  ngOnInit() {
  }

  public signOut(){
    this.user.signOut()
    this.router.navigate(["/"]);
  }
}
