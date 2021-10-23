import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSectionComponent } from './alert-section.component';

describe('AlertSectionComponent', () => {
  let component: AlertSectionComponent;
  let fixture: ComponentFixture<AlertSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
