import { Component, OnInit, ApplicationRef } from '@angular/core';
import {Router} from "@angular/router";
import { User } from "../user"
import { UserRegistrationService } from "../cognito.service";
import { CognitoCallback } from "../cognito.service";

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit, OnDestroy, CognitoCallback {
    confirmationCode:string;
    email:string;
    errorMessage:string;

    constructor(public regService:UserRegistrationService, public router:Router, private user:User) {
    }

    ngOnInit() {
        this.errorMessage = null;
    }

    ngOnDestroy() {
    }

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.confirmRegistration(localStorage.getItem("email"), this.confirmationCode, this);
    }

    cognitoCallback(message:string, result:any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("message: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("Moving to dashboard");
            this.user.confirmed = true
            this.router.navigate(['/users/dashboard']);
        }
    }
}
