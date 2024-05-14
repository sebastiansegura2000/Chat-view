import { TestBed } from '@angular/core/testing';

import { MqttHandlerService } from './mqtt-handler.service';

describe('MqttHandlerService', () => {
  let service: MqttHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
