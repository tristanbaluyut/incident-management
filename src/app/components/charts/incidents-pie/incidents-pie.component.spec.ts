import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsPieComponent } from './incidents-pie.component';

describe('IncidentsPieComponent', () => {
  let component: IncidentsPieComponent;
  let fixture: ComponentFixture<IncidentsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
