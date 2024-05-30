import { TestBed } from '@angular/core/testing';

import { IUserActivityService } from './iuser-activity.service';

describe('IUserActivityService', () => {
  let service: IUserActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IUserActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
