import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  public confirmationCode:string;
  constructor(private session:SessionService, private router:Router) { }

  ngOnInit() {
  }

  public confirmUser(){
    this.session.user.verify(this.confirmationCode).subscribe(
      (next) => {
        console.log("User Successfully Verified")
        this.router.navigate(["/membership"]);
      },
      (error) => {
        console.log(error)
      }
    )
  }



}
