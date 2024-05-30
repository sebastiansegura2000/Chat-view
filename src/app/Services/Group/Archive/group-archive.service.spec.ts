import { TestBed } from '@angular/core/testing';

import { GroupArchiveService } from './group-archive.service';

describe('GroupArchiveService', () => {
  let service: GroupArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
