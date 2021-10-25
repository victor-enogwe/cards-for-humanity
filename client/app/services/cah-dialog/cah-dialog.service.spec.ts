import { TestBed } from '@angular/core/testing';
import { CahDialogService } from './cah-dialog.service';

describe('CahDialogService', () => {
  let service: CahDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CahDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
