import { TestBed } from '@angular/core/testing';
import { MainContentRefService } from './main-content-ref.service';

describe('MainContentRefService', () => {
  let service: MainContentRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainContentRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
