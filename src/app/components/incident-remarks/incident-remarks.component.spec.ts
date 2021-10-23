import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentRemarksComponent } from './incident-remarks.component';

describe('IncidentRemarksComponent', () => {
  let component: IncidentRemarksComponent;
  let fixture: ComponentFixture<IncidentRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
