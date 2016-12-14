import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import { FormsModule }   from '@angular/forms';
import {Subscriber} from "rxjs/Subscriber";
import {Router} from "@angular/router";

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA',
  ClientId : '58qe0b7458eo9705kijc7hjhv6'
};

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  newUser = new User("", "");

  constructor(private router:Router) { }

  ngOnInit() {

  }

  runExperiment(){
    this.verifyUser()
  }

  public onSubmit(){
    console.log("onSubmit()")
    this.newUser = new User(this.newUser.email, this.newUser.password);
    this.newUser.create().subscribe(
      (next) => {
        console.log(next);
        this.verifyUser()
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



  public verifyUser(){
    let code = prompt("Please Enter Your Verification Code (Check Your Email)");
    this.newUser.verify(code).subscribe(
      (next) => {
        console.log("User Successfully Verified")
        this.router.navigate(["/dashboard"]);
      },
      (error) => {

      }
    )
  }
}
