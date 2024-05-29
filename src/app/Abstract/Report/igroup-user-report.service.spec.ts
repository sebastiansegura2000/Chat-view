import { TestBed } from '@angular/core/testing';

import { IGroupUserReportService } from './igroup-user-report.service';

describe('IGroupUserReportService', () => {
  let service: IGroupUserReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGroupUserReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
