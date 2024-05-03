import { TestBed } from '@angular/core/testing';

import { IMessageQueryForGroupService } from './imessage-query-for-group.service';

describe('IMessageQueryForGroupService', () => {
  let service: IMessageQueryForGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMessageQueryForGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
