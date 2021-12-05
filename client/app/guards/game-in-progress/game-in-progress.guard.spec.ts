import { TestBed } from '@angular/core/testing';

import { GameInProgressGuard } from './game-in-progress.guard';

describe('GameInProgressGuard', () => {
  let guard: GameInProgressGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameInProgressGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
