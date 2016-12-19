import { Injectable } from '@angular/core';

@Injectable()
export class AWSService {

  constructor() { }

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
