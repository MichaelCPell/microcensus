import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import { FormsModule }   from '@angular/forms';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA',
  ClientId : '58qe0b7458eo9705kijc7hjhv6'
};

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [FormsModule]
})
export class UserRegistrationComponent implements OnInit {

  newUser = new User("", "");

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(){
    console.log("onSubmit()")
    this.foo = new User(this.newUser.email, this.newUser.password)
  }
}
