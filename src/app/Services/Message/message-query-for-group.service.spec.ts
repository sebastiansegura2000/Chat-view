import { TestBed } from '@angular/core/testing';

import { MessageQueryForGroupService } from './message-query-for-group.service';

describe('MessageQueryForGroupService', () => {
  let service: MessageQueryForGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageQueryForGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
