import { TestBed } from '@angular/core/testing';

import { MessageQueryService } from './message-query.service';

describe('MessageQueryService', () => {
  let service: MessageQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
