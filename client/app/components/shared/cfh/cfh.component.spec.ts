import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CfhComponent } from './cfh.component';

describe('CfhComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CfhComponent],
      }).compileComponents();
    }),
  );

  it('should create the cfh', () => {
    const fixture = TestBed.createComponent(CfhComponent);
    const cfh = fixture.componentInstance;
    expect(cfh).toBeTruthy();
  });

  it("should have as title 'cfh'", () => {
    const fixture = TestBed.createComponent(CfhComponent);
    const cfh = fixture.componentInstance;
    expect(cfh).toEqual('cfh');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CfhComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('cfh is running!');
  });
});
