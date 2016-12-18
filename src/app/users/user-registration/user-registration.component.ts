import { Component, OnInit, OnDestroy } from '@angular/core';
import {User} from "../user";
import { FormsModule }   from '@angular/forms';
import {Subscriber} from "rxjs/Subscriber";
import {Router} from "@angular/router";
import {SessionService} from "../session.service";

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
export class UserRegistrationComponent implements OnInit, OnDestroy {

  public formUser = {email: "", password: ""};
  public newUser:User;

  constructor(private router:Router, private session:SessionService) { }

  ngOnInit() {

  }


  runExperiment(){
  }

  public authenticateUser(){
    console.log("authenticateUser()")
    this.newUser = new User(this.formUser.email, this.formUser.password);
    this.newUser.authenticate().subscribe(
      (next) => {
        console.log(next);
        this.session.user = this.newUser;
        this.session.user.reload(() => {
          this.router.navigate(["/dashboard"])
        });
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
    console.log("createUser()")
    this.newUser = new User(this.formUser.email, this.formUser.password);
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
        this.session.user = this.newUser;
        this.router.navigate(["/membership"]);
      },
      (error) => {

      }
    )
  }
}
