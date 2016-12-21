import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import { FormsModule }   from '@angular/forms';
import {Subscriber} from "rxjs/Subscriber";
import {Observer} from "rxjs/Observer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public formUser = {email: "", password: ""};

  constructor(private router:Router, public newUser:User) { }

  ngOnInit() {
  }


  public authenticateUser(){

    this.newUser.authenticate()
  }

  public createUser(){

    this.newUser.create(this.formUser.email, this.formUser.password)
    .subscribe(
      (next) => {
        console.log(next)
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
