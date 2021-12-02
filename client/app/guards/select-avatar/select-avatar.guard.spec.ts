import { TestBed } from '@angular/core/testing';

import { SelectAvatarGuard } from './select-avatar.guard';

describe('SelectAvatarGuard', () => {
  let guard: SelectAvatarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectAvatarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
