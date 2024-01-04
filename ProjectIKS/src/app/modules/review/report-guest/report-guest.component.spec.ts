import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGuestComponent } from './report-guest.component';

describe('ReportGuestComponent', () => {
  let component: ReportGuestComponent;
  let fixture: ComponentFixture<ReportGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportGuestComponent]
    });
    fixture = TestBed.createComponent(ReportGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
