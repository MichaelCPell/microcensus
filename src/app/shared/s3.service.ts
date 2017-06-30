import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as AWS from "aws-sdk";
import { AwsService } from "../services/aws.service";

@Injectable()
export class S3Service{

  constructor(private aws:AwsService){}

  private s3;

  public publishReport(file){
    this.s3 = new AWS.S3();
    return Observable.create((observer) => {
      this.s3.upload({
        Bucket: "carto.report",
        Key: this.convertToSlug(file.name)  + ".html",
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
    });
  }

  private convertToSlug(Text){
      return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }
}
