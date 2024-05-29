import { TestBed } from '@angular/core/testing';

import { GroupUserReportService } from './group-user-report.service';

describe('GroupUserReportService', () => {
  let service: GroupUserReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupUserReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
