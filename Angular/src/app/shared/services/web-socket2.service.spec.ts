import { TestBed } from '@angular/core/testing';

import { WebSocket2Service } from './web-socket2.service';

describe('WebSocket2Service', () => {
  let service: WebSocket2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocket2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
