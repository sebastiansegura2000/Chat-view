import { TestBed } from '@angular/core/testing';

import { IGroupArchiveService } from './igroup-archive.service';

describe('IGroupArchiveService', () => {
  let service: IGroupArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGroupArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
