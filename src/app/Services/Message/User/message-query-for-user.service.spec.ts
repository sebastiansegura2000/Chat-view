import { TestBed } from '@angular/core/testing';

import { MessageQueryForUserService } from './message-query-for-user.service';

describe('MessageQueryForUserService', () => {
  let service: MessageQueryForUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageQueryForUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
