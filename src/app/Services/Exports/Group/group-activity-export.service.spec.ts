import { TestBed } from '@angular/core/testing';

import { GroupActivityExportService } from './group-activity-export.service';

describe('GroupActivityExportService', () => {
  let service: GroupActivityExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupActivityExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
