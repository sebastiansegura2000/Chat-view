import { TestBed } from '@angular/core/testing';

import { CreateGroupFormService } from './create-group-form.service';

describe('CreateGroupFormService', () => {
  let service: CreateGroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGroupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
