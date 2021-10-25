import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CahShellComponent } from './shell.component';

describe('CahShellComponent', () => {
  let component: CahShellComponent;
  let fixture: ComponentFixture<CahShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CahShellComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CahShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
