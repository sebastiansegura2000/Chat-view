import { TestBed } from '@angular/core/testing';

import { IMessageQueryService } from './imessage-query.service';

describe('IMessageQueryService', () => {
  let service: IMessageQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMessageQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
