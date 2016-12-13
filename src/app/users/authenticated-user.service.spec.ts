/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticatedUserService } from './authenticated-user.service';

describe('AuthenticatedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatedUserService]
    });
  });

  it('should ...', inject([AuthenticatedUserService], (service: AuthenticatedUserService) => {
    expect(service).toBeTruthy();
  }));
});
