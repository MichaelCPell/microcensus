import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserRegistrationService } from "../cognito.service";
import { RegistrationUser } from "../registration-user";
import { CognitoCallback } from "../cognito.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './user-registration.component.html'
})
export class UserRegistrationComponent implements CognitoCallback {
    registrationUser:RegistrationUser;
    router:Router;
    errorMessage:string;

    constructor(public userRegistration:UserRegistrationService, router:Router) {
        this.router = router;
        this.onInit();
    }

    onInit() {
        this.registrationUser = new RegistrationUser();
        this.errorMessage = null;
    }

    onRegister() {
        this.errorMessage = null;
        this.userRegistration.register(this.registrationUser, this);
    }

    cognitoCallback(message:string, result:any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("redirecting");
            this.router.navigate(['/home/confirmRegistration', result.user.username]);
        }
    }
}
