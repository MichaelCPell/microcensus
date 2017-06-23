import { Component, Inject, Injectable, Output, EventEmitter } from "@angular/core";
import { UserRegistrationService } from "../../../cognito.service";
import { RegistrationUser } from "../../../registration-user";
import { CognitoCallback } from "../../../cognito.service";
import { CognitoUser } from "../../../cognito-user"
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
    @Output() clickEvent = new EventEmitter<string>();
    @Output() submitEvent = new EventEmitter<RegistrationUser>();
    registrationUser:RegistrationUser;
    errorMessage:string;
    email:string;
    password:string;

    constructor() {
    }



    public submit(){
        this.submitEvent.emit(new RegistrationUser(this.email, this.password));
    }
}
