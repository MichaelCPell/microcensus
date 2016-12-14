var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
  ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
import {Observable} from 'rxjs/Observable';

export class User {


  constructor(public email:string, public password:string, private needsRegistration?:boolean){}

  public create(){
    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : this.email
    };

    return Observable.create( (observer) => {
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      userPool.signUp(this.email, this.password, attributeList, null, function(err, result){
        if (err) {
          observer.error(err);
          return;
        }
        observer.next(result);
      });
    })
  }
  // public authenticate(){
  //   return new Promise((resolve, error) => {
  //     var authenticationData = {
  //            Username : this.email,
  //            Password : this.password
  //      };
  //     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  //
  //     var userData = {
  //         Username : this.email,
  //         Pool : userPool
  //     };
  //     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  //     cognitoUser.authenticateUser(authenticationDetails, {
  //       onSuccess: function (result) {
  //           console.log('access token + ' + result.getAccessToken().getJwtToken());
  //
  //           // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //           //     IdentityPoolId : '...', // your identity pool id here
  //           //     Logins : {
  //           //         // Change the key below according to the specific region your user pool is in.
  //           //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
  //           //     }
  //           // });
  //
  //           // Instantiate aws sdk service objects now that the credentials have been updated.
  //           // example: var s3 = new AWS.S3();
  //       },
  //       onFailure: function(err) {
  //         console.log(err)
  //       }
  //     })
  //   })
  // }


  public verify(code){
      var userData = {
          Username : this.email,
          Pool : userPool
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


      return Observable.create( (observer) => {
        cognitoUser.confirmRegistration(code, false, function(err, msg){
          if(err){
            console.log("Error" + err)
            return
          }

          observer.next(msg)
        })
      })

  }
}
