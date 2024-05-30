import { TestBed } from '@angular/core/testing';

import { MessageReportService } from './message-report.service';

describe('MessageReportService', () => {
  let service: MessageReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
