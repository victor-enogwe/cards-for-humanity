import { TestBed } from '@angular/core/testing';

import { HttpLinkService } from './http-link.service';

describe('HttpLinkService', () => {
  let service: HttpLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
