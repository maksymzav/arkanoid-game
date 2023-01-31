import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersControlsComponent } from './players-controls.component';

describe('PlayersControlsComponent', () => {
  let component: PlayersControlsComponent;
  let fixture: ComponentFixture<PlayersControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayersControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
