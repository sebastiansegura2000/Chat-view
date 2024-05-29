import { TestBed } from '@angular/core/testing';

import { IUserReportService } from './iuser-report.service';

describe('IUserReportService', () => {
  let service: IUserReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IUserReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
