/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublisherService } from './publisher.service';
import { ResearchAreaService } from "../shared/research-area.service";
import { DynamoDBService } from "../shared/ddb.service";
import { S3Service } from "../shared/s3.service";
import {User} from "../users/user";
import {HttpModule} from '@angular/http';


fdescribe('PublisherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublisherService, ResearchAreaService, DynamoDBService, S3Service, User],
      imports: [HttpModule]
    });
  });

  it('should resolve all of the dependencies for the test...', inject([PublisherService], (service: PublisherService) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve all of the dependencies for the test...', inject([PublisherService], (service: PublisherService) => {
    expect(service.publish()).toBeTruthy();
  }));

  describe("addReportHtml()", ()=>{

    it("accepts html string that will end up in the body", inject([PublisherService], (service: PublisherService) => {
      service.addReportHtml("<div id='chart1'></div>")

      expect(service.body.join("")).toContain("chart1")
    }))

  });

  describe("addReportScript()", ()=>{

    it("accepts html string that will end up in the body", inject([PublisherService], (service: PublisherService) => {
      service.addReportScript("console.log(1)")

      expect(service.body.join("")).toContain("console.log(1)")
    }))

  })



  describe("publish()", () => {
    it("should broadcast a success or failure message", () => {

    })
  })
});
