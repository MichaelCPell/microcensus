import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserRegistrationService } from "../cognito.service";
import { RegistrationUser } from "../registration-user";
import { CognitoCallback } from "../cognito.service";
import { User } from "../user"

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements CognitoCallback {
    registrationUser:RegistrationUser;
    router:Router;
    errorMessage:string;

    constructor(public userRegistration:UserRegistrationService,
                router:Router,
                private user:User) {
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
            localStorage.setItem("email", this.registrationUser.email)
            localStorage.setItem("password", this.registrationUser.password)
            this.user.email = this.registrationUser.email
            this.router.navigate(['/users/confirmation']);
        }
    }
}
