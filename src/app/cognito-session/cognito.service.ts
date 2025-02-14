import {Injectable, Inject} from "@angular/core";
import {RegistrationUser} from "./registration-user";
// import {AwsUtil} from "./aws.service";
import { CognitoSessionStore } from './cognito-session.store';
import { environment } from '../../environments/environment'
import * as AWS from "aws-sdk";

import {CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

export interface CognitoCallback {
    cognitoCallback(message:string, result:any):void;
}

export interface LoggedInCallback {
    isLoggedIn(message:string, loggedIn:boolean):void;
}

export interface Callback {
    callback():void;
    callbackWithParam(result:any):void;
}

@Injectable()
export class CognitoUtil {
    public static _REGION = "us-east-1";
    public static _IDENTITY_POOL_ID = environment.identityPoolId;
    public static _USER_POOL_ID = environment.userPoolId;
    public static _CLIENT_ID = environment.poolClientId;

    public static _POOL_DATA = {
        UserPoolId: CognitoUtil._USER_POOL_ID,
        ClientId: CognitoUtil._CLIENT_ID
    };


    // public static getAwsCognito():any {
    //     return CognitoJS
    // }

    constructor(private store:CognitoSessionStore){
    }

    getUserPool() {
        return new CognitoUserPool(CognitoUtil._POOL_DATA);
    }

    getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }


    getCognitoIdentity():string {
        return AWS.config.credentials["identityId"];
    }

    getAccessToken(callback:Callback):void {
        if (callback == null) {
            throw("CognitoUtil: callback in getAccessToken is null...returning");
        }
        if (this.getCurrentUser() != null){
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        }else{
            callback.callbackWithParam(null);
        }
    }

    getIdToken(callback:Callback):void {
        if (callback == null) {
            throw("CognitoUtil: callback in getIdToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    } else {
                        console.log("CognitoUtil: Got the id token, but the session isn't valid");
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    getRefreshToken(callback:Callback):void {
        if (callback == null) {
            throw("CognitoUtil: callback in getRefreshToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }

                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    refresh():void {
        let currentUser  = this.getCurrentUser();
        this.store.set("user", currentUser) 
        if(currentUser){
            this.store.set("activeComponent", "loggedIn");
        }
    }
}

@Injectable()
export class UserLoginService {

    constructor(public cognitoUtil:CognitoUtil, 
                private store:CognitoSessionStore) {
        this.cognitoUtil.refresh()
    }

    authenticate(username:string, password:string) {
        // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
        AWS.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

        let authenticationData = {
            Username: username,
            Password: password,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:  (result) => {
                this.cognitoUtil.refresh();
            },
            onFailure:  (err) => {
                this.store.set("notice", err.message)
            },
        });
    }

    forgotPassword(username:string) {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: () => {
                this.store.set("notice", "Successfully reset, check your e-mail.")
                this.store.set("activeComponent", "reset")
                this.store.set("credentials", {email: username})
            },
            onFailure: (err) => {
                this.store.set("notice", err.message)
            }
        });
    }

    confirmNewPassword(email:string, verificationCode:string, password:string) {
        let userData = {
            Username: email,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess:  () => {
                this.store.set("notice", "Password accepted.  Now log in.")
                this.store.set("activeComponent", "login")
            },
            onFailure:  (err) => {
                this.store.set("notice", err.message)
            }
        });
    }

    logout() {
        this.store.set("activeComponent","login")
        this.cognitoUtil.getCurrentUser().signOut();
        this.store.set("user", undefined)
        localStorage.clear();
    }

    isAuthenticated(callback:LoggedInCallback) {
        if (callback == null)
            throw("UserLoginService: Callback in isAuthenticated() cannot be null");

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.isLoggedIn(err, false);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log("UserLoginService: can't retrieve the current user");
            callback.isLoggedIn("Can't retrieve the CurrentUser", false);
        }
    }

}

@Injectable()
export class UserRegistrationService {

    constructor(@Inject(CognitoUtil) public cognitoUtil:CognitoUtil,
                @Inject(UserLoginService) public login:UserLoginService,
                public store:CognitoSessionStore
                ) {

    }

    register(user:RegistrationUser):void {
        console.log(`Reg called ${JSON.stringify(user)}`)
        this.store.set("credentials", user)

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };

        attributeList.push(new CognitoUserAttribute(dataEmail));



        this.cognitoUtil.getUserPool().signUp(user.email, user.password, attributeList, null, (err, result) => {

            if (err) {
                console.log(err)
                this.store.set("notice", err.message)
            } else {
                console.log(result)
                this.store.set("activeComponent", "confirm")
            }
        });

    }

    confirmRegistration(username:string, confirmationCode:string):void {

        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };
        let cognitoUser = new CognitoUser(userData);

        this.store.set("notice", "Hang on while we confirm and finalize your account.  This may take up to 30 seconds.")


        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                 this.store.set("notice", err.message)
            } else {
                console.log("Successfully Confirmed")
                this.store.select("credentials").subscribe(
                    (credentials) => {
                        this.login.authenticate(credentials["email"], credentials["password"])
                    }
                ).unsubscribe();
            }
        });
    }

    resendCode(username:string):void {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode( (err, result) => {
            if (err) {
                this.store.set("notice", err.message)
            } else {
                this.store.set("notice", "Message has been sent.")
            }
        });
    }

}

@Injectable()
export class UserParametersService {

    constructor(public cognitoUtil:CognitoUtil) {
    }

    getParameters(callback:Callback) {
        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err)
                    console.log("UserParametersService: Couldn't retrieve the user");
                else {
                    cognitoUser.getUserAttributes(function (err, result) {
                        if (err) {
                            console.log("UserParametersService: in getParameters: " + err);
                        } else {
                            callback.callbackWithParam(result);
                        }
                    });
                }

            });
        } else {
            callback.callbackWithParam(null);
        }


    }
}
