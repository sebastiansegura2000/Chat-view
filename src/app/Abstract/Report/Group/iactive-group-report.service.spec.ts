import { TestBed } from '@angular/core/testing';

import { IActiveGroupReportService } from './iactive-group-report.service';

describe('IActiveGroupReportService', () => {
  let service: IActiveGroupReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IActiveGroupReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
