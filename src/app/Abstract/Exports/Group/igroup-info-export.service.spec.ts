import { TestBed } from '@angular/core/testing';

import { IGroupInfoExportService } from './igroup-info-export.service';

describe('IGroupInfoExportService', () => {
  let service: IGroupInfoExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGroupInfoExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
