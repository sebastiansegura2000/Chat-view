import { TestBed } from '@angular/core/testing';

import { IInactiveGroupReportService } from './iinactive-group-report.service';

describe('IInactiveGroupReportService', () => {
  let service: IInactiveGroupReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IInactiveGroupReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
