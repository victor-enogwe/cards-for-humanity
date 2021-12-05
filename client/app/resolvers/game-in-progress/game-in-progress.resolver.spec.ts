import { TestBed } from '@angular/core/testing';

import { GameInProgressResolver } from './game-in-progress.resolver';

describe('GameInProgressResolver', () => {
  let resolver: GameInProgressResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GameInProgressResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
