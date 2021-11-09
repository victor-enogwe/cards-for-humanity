import { TestBed } from '@angular/core/testing';

import { NewGameResolver } from './new-game.resolver';

describe('NewGameResolver', () => {
  let resolver: NewGameResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewGameResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
