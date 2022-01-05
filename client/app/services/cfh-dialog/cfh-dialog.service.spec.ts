import { TestBed } from '@angular/core/testing';
import { CfhDialogService } from './cfh-dialog.service';

describe('CfhDialogService', () => {
  let service: CfhDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfhDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
