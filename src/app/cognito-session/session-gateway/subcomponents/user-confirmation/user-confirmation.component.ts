import { Component, OnInit, ApplicationRef, EventEmitter, Output, Input } from '@angular/core';
import {Router} from "@angular/router";
import { User } from '../../../../models/user'
import { UserRegistrationService } from "../../../cognito.service";
import { CognitoCallback } from "../../../cognito.service";
import * as AWS from "aws-sdk";
@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})

export class UserConfirmationComponent {
    confirmationCode:string;
    @Input() email:string;
    errorMessage:string;
    inProgress:boolean = false;
    @Output() clickEvent:EventEmitter<string> = new EventEmitter<string>();
    @Output() submitEvent:EventEmitter<{email:string, code:string}> = new EventEmitter<{email:string, code:string}>();

    constructor(public regService:UserRegistrationService) {
    }


    confirm(e){
        console.log(e)
    }


    public submit(){
        this.submitEvent.emit({
            email: this.email,
            code: this.confirmationCode
        })
    }

}
