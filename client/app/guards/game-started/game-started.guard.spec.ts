import { TestBed } from '@angular/core/testing';

import { GameStartedGuard } from './game-started.guard';

describe('GameStartedGuard', () => {
  let guard: GameStartedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameStartedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
