import { TestBed } from '@angular/core/testing';

import { IUSerRepositoryService } from './iuser-repository.service';

describe('IUSerRepositoryService', () => {
  let service: IUSerRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IUSerRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
