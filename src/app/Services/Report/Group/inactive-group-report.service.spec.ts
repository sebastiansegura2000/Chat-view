import { TestBed } from '@angular/core/testing';

import { InactiveGroupReportService } from './inactive-group-report.service';

describe('InactiveGroupReportService', () => {
  let service: InactiveGroupReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactiveGroupReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
