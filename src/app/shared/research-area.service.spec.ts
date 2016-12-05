/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResearchAreaService } from './research-area.service';

describe('ResearchAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearchAreaService]
    });
  });

  it('should ...', inject([ResearchAreaService], (service: ResearchAreaService) => {
    expect(service).toBeTruthy();
  }));
});
