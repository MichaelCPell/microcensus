export interface CognitoCallback{
  cognitoCallback(message:string, result:any):void;
}

export interface LoggedInCallback{
  isLoggedIn(message:string, loggedIn:boolean):void;
}

export interface Callback {
  callback():void;
  callbackWithParam(result:any):void;
}
