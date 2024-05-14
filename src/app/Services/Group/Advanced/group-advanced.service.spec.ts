import { TestBed } from '@angular/core/testing';

import { GroupAdvancedService } from './group-advanced.service';

describe('GroupAdvancedService', () => {
  let service: GroupAdvancedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupAdvancedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
