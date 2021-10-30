import { TestBed } from '@angular/core/testing';

import { NonceService } from './nonce.service';

describe('NonceService', () => {
  let service: NonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
