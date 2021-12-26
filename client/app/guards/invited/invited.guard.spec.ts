import { TestBed } from '@angular/core/testing';

import { InvitedGuard } from './invited.guard';

describe('InvitedGuard', () => {
  let guard: InvitedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InvitedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
