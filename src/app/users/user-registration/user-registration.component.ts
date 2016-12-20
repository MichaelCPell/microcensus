import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import { FormsModule }   from '@angular/forms';
import {Subscriber} from "rxjs/Subscriber";
import {Observer} from "rxjs/Observer";
import {Router} from "@angular/router";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public formUser = {email: "", password: ""};

  constructor(private router:Router, private session:SessionService, public newUser:User) { }

  ngOnInit() {
  }


  public authenticateUser(){
    this.newUser.email = this.formUser.email;
    this.newUser.password = this.formUser.password;

    this.newUser.authenticate().subscribe(
      (next) => {
        this.session.user = this.newUser;
        this.session.user.reload().subscribe(
          next => {
            this.router.navigate(["/dashboard"]);
          }
        )
      },
      (error) => {
        switch(error.code){
          case "UsernameExistsException":
          break;
          default:
            console.log("Uncaught Error Code: %s", error.code)
          break;
        }
      },
      () => console.log('onCompleted')
    );
  }

  public createUser(){
    this.newUser.email = this.formUser.email;
    this.newUser.password = this.formUser.password;

    this.newUser.create().subscribe(
      (next) => {
        console.log(next);
        this.session.user = this.newUser;
        this.newUser.confirmed = next.userConfirmed;
        this.router.navigate(["/users/confirmation"]);
      },
      (error) => {
        console.log("Uncaught Error Code: %s", error.code)
        switch(error.code){
          case "UsernameExistsException":
          break;
          case "MissingRequiredParameter":
          break;
          default:
            console.log("Uncaught Error Code: %s", error.code)
          break;
        }
      },
      () => console.log('onCompleted')
    );
  }

}
