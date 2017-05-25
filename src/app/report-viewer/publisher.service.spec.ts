/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublisherService } from './publisher.service';
import { ResearchAreaService } from "../shared/research-area.service";
import { DynamoDBService } from "../shared/ddb.service";
import { S3Service } from "../shared/s3.service";
import {User} from "../users/user";
import {HttpModule} from '@angular/http';


describe('PublisherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublisherService, ResearchAreaService, DynamoDBService, S3Service, User],
      imports: [HttpModule]
    });
  });
});
