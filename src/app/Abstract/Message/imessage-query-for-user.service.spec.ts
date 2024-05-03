import { TestBed } from '@angular/core/testing';

import { IMessageQueryForUserService } from './imessage-query-for-user.service';

describe('IMessageQueryForUserService', () => {
  let service: IMessageQueryForUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMessageQueryForUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
