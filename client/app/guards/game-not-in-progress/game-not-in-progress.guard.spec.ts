import { TestBed } from '@angular/core/testing';

import { GameNotInProgressGuard } from './game-not-in-progress.guard';

describe('GameNotInProgressGuard', () => {
  let guard: GameNotInProgressGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameNotInProgressGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
