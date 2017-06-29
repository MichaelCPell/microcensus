import {Injectable} from "@angular/core";
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk';


@Injectable()
export class AwsService {
    public static _REGION = "us-east-1";
    public static _IDENTITY_POOL_ID = environment.identityPoolId;
    public static _USER_POOL_ID = environment.userPoolId;

    constructor() {
        AWS.config.region = "us-east-1"

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AwsService._IDENTITY_POOL_ID
        })
    }

    configAWS(token?:string){
        let logins = {}
        logins[`cognito-idp.${AwsService._REGION}.amazonaws.com/${AwsService._USER_POOL_ID}`] = token;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AwsService._IDENTITY_POOL_ID,
            Logins: logins
        })
    }
}
