import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CahComponent } from './cah.component';

describe('CahComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CahComponent],
      }).compileComponents();
    }),
  );

  it('should create the cah', () => {
    const fixture = TestBed.createComponent(CahComponent);
    const cah = fixture.componentInstance;
    expect(cah).toBeTruthy();
  });

  it("should have as title 'cah'", () => {
    const fixture = TestBed.createComponent(CahComponent);
    const cah = fixture.componentInstance;
    expect(cah).toEqual('cah');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CahComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('cah is running!');
  });
});
