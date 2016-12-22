import { Component, OnInit, ApplicationRef } from '@angular/core';
import {Router} from "@angular/router";
import { User } from "../user"

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  public confirmationCode:string;
  constructor(private router:Router, public user:User, private af: ApplicationRef) { }

  ngOnInit() {
  }

  public confirmUser(){
    this.user.confirm(this.confirmationCode)
    var host = this;
    this.user.confirmed.subscribe(
      ((next) => {
        if(next == true){
          this.router.navigate(["/dashboard"]);
        }
      }).bind(this)
    )
  }


  public runExperiment(){
    this.user.signOut();
  }
}
