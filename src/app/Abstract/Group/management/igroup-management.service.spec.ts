import { TestBed } from '@angular/core/testing';

import { IGroupManagementService } from './igroup-management.service';

describe('IGroupManagementService', () => {
  let service: IGroupManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGroupManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
