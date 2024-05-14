import { TestBed } from '@angular/core/testing';

import { IGroupAdvancedService } from './igroup-advanced.service';

describe('IGroupAdvancedService', () => {
  let service: IGroupAdvancedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGroupAdvancedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
