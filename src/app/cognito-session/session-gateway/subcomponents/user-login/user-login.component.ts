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
    @Output() clickEvent = new EventEmitter<string | RegistrationUser>();
    @Output() submitEvent = new EventEmitter<RegistrationUser>();
    @Output() resetPasswordEvent = new EventEmitter<string>();
    @Input() email:string;
    public password;
    
    
    constructor() { }
  
    ngOnInit() {
    }

    public submit(){
        this.submitEvent.emit(new RegistrationUser(this.email, this.password));
    }

    public resetPassword(){
        this.resetPasswordEvent.emit(this.email)
    }

}
