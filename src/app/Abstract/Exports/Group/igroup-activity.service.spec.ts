import { TestBed } from '@angular/core/testing';

import { IGroupActivityService } from './igroup-activity.service';

describe('IGroupActivityService', () => {
  let service: IGroupActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGroupActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
