import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersSmallComponent } from './players-small.component';

describe('PlayersSmallComponent', () => {
  let component: PlayersSmallComponent;
  let fixture: ComponentFixture<PlayersSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayersSmallComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
