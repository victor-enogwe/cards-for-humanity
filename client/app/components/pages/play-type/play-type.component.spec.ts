import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTypeComponent } from './play-type.component';

describe('PlayTypeComponent', () => {
  let component: PlayTypeComponent;
  let fixture: ComponentFixture<PlayTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
