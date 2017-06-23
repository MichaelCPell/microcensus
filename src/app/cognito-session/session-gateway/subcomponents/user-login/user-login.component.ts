import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RegistrationUser } from "../../../registration-user";
import * as AWS from "aws-sdk";
import { User } from "../../../../models/user";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    @Output() loginSubmission = new EventEmitter<RegistrationUser>();
    @Input() email:string;
    public password;
    
    
    constructor(private user:User) { }
  
    ngOnInit() {
    }

    public submit(){
        this.loginSubmission.emit(new RegistrationUser(this.email, this.password));
    }
}
