import { TestBed } from '@angular/core/testing';

import { IMessageReportService } from './imessage-report.service';

describe('IMessageReportService', () => {
  let service: IMessageReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMessageReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
