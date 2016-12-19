import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as AWS from 'aws-sdk';


var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var poolData = {
  UserPoolId : 'us-east-1_T2p3nd9xA', // Your user pool id here
  ClientId : '58qe0b7458eo9705kijc7hjhv6' // Your client id here
};

@Injectable()
export class AWSService {
  private _cognitoUser;
  private _userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  constructor() { }

  get cognitoUser(){
    return this._cognitoUser;
  }

  set cognitoUser(value){
   this._cognitoUser = value;
  }


  public getSession(): Observable<string>{
    this.cognitoUser = this._userPool.getCurrentUser();

    return Observable.create( (observer) => {

      if (this.cognitoUser != null) {
          this.cognitoUser.getSession((err, session) => {
              if (err) {
                 alert(err);
                  return;
              }
              console.log('session validity: ' + session.isValid());
              observer.next(this.cognitoUser.username)

              // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              //     IdentityPoolId : '...', // your identity pool id here
              //     Logins : {
              //         // Change the key below according to the specific region your user pool is in.
              //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
              //     }
              // });

              // Instantiate aws sdk service objects now that the credentials have been updated.
              // example: var s3 = new AWS.S3();

          });
      }

    })
  }


  public createUser(email:string, password:string){
    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : email
    };
    var homeThis = this;
    return Observable.create( (observer) => {
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      this._userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          observer.error(err);
          return;
        }
        homeThis.cognitoUser = result.user;
        observer.next(result);
      });
    })
  }

  public authenticateUser(email:string, password:string){
    var authenticationData = {
           Username : email,
           Password : password
     };

     var userData = {
         Username : email,
         Pool : this._userPool
     };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    return Observable.create( (observer) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess:  (result) => {
            this.cognitoUser = this._userPool.getCurrentUser();
            observer.next(result);
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
                Logins : {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
                }
            });
            cognitoUser.cacheTokens();
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
        },
        onFailure: function(err) {
          observer.error(err)
        }
      })
    });
  }


  public signOut(){
    if(this._cognitoUser == undefined) this._cognitoUser = this._userPool.getCurrentUser();
    this._cognitoUser.signOut();
  }


  public verifyUser(code, callback){
    this.cognitoUser.confirmRegistration(code, true, callback);
  }
}

//
//
// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const poolData = {
//   UserPoolId : 'us-east-1_T2p3nd9xA',
//   ClientId : '58qe0b7458eo9705kijc7hjhv6'
// };
//
// var albumBucketName = 'deletelater123';
// var bucketRegion = 'us-east-1';
// var IdentityPoolId = 'us-east-1_USx2I1lHS';
//
// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
// });
//
// var s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   params: {Bucket: "deletelater123"}
// });
//
// var f = new File([document.documentElement.outerHTML], "new_report.html" ,{type: "text/html"})
// s3.upload({
//   Bucket: "deletelater123",
//   Key: "report.html",
//   Body: "test",
//   ACL: 'public-read',
//   ContentType: 'text/html'
// }, function(err, data) {
//   if (err) {
//     console.log(err)
//     return
//     // return alert('There was an error uploading: ', err.message);
//
//   }
//   alert('Successfully uploaded photo.');
// });
//
// public create(){
//   var attributeList = [];
//
//   var dataEmail = {
//     Name : 'email',
//     Value : this.email
//   };
//
//   return Observable.create( (observer) => {
//     var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
//
//     attributeList.push(attributeEmail);
//
//     userPool.signUp(this.email, this._password, attributeList, null, function(err, result){
//       if (err) {
//         observer.error(err);
//         return;
//       }
//
//       console.log(result)
//       observer.next(result);
//     });
//   })
// }
//
// public authenticate(){
//   var authenticationData = {
//          Username : this.email,
//          Password : this._password
//    };
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
//
//   var userData = {
//       Username : this.email,
//       Pool : userPool
//   };
//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//
//   return Observable.create( (observer) => {
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function (result) {
//           observer.next(result);
//           AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//               IdentityPoolId : 'us-east-1:6e4d0144-6a6b-4ccc-8c5e-66ddfd92c658',
//               Logins : {
//                   'cognito-idp.us-east-1.amazonaws.com/us-east-1_T2p3nd9xA' : result.getIdToken().getJwtToken()
//               }
//           });
//           cognitoUser.cacheTokens();
//           // Instantiate aws sdk service objects now that the credentials have been updated.
//           // example: var s3 = new AWS.S3();
//       },
//       onFailure: function(err) {
//         observer.error(err)
//       }
//     })
//   });
// }
//
// public verify(code){
//     var userData = {
//         Username : this.email,
//         Pool : userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//
//
//     return Observable.create( (observer) => {
//       cognitoUser.confirmRegistration(code, false, function(err, msg){
//         if(err){
//           console.log("Error" + err)
//           return
//         }
//         observer.next(msg)
//       })
//     })
//
// }
//
//
// public reload(callback){
//   return RxHttpRequest.get(`https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/users/${this.email}`).subscribe(
//     (data) => {
//       if (data.response.statusCode === 200) {
//           this.setAttributesFromDb(JSON.parse(data.body)["Item"]);
//
//           callback();
//       }
//     },
//     (err) => console.error(err)
//   );
// }
//
// private setAttributesFromDb(data){
//   this._paid = data["paid"]["S"]
//   this._remainingReports = data["remaining_reports"]["N"]
// }
