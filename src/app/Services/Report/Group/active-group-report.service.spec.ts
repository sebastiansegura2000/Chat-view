import { TestBed } from '@angular/core/testing';

import { ActiveGroupReportService } from './active-group-report.service';

describe('ActiveGroupReportService', () => {
  let service: ActiveGroupReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveGroupReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
