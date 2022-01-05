import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CfhShellComponent } from './shell.component';

describe('CfhShellComponent', () => {
  let component: CfhShellComponent;
  let fixture: ComponentFixture<CfhShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CfhShellComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CfhShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
