import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class S3Service{
  private s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: "deletelater123"}
  });


  public publishReport(file){
    return Observable.create((function(observer) {
      this.s3.upload({
        Bucket: "reports.themicrocensus.com",
        Key: file.name + ".html",
        Body: file,
        ACL: 'public-read',
        ContentType: 'text/html'
      }, (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        observer.next(data)
      });
    }).bind(this));
  }

}
