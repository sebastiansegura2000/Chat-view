import { TestBed } from '@angular/core/testing';

import { GroupInfoExportService } from './group-info-export.service';

describe('GroupInfoExportService', () => {
  let service: GroupInfoExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupInfoExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
