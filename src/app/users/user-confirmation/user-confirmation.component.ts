import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { User } from "../user"

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  public confirmationCode:string;
  constructor(private router:Router, public user:User) { }

  ngOnInit() {
  }

  public confirmUser(){
    this.user.verify(this.confirmationCode, (result) => {
      this.router.navigate(["/membership"])
    })
  }
}
