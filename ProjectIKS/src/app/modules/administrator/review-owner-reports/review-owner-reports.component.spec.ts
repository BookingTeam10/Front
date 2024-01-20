import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOwnerReportsComponent } from './review-owner-reports.component';

describe('ReviewOwnerReportsComponent', () => {
  let component: ReviewOwnerReportsComponent;
  let fixture: ComponentFixture<ReviewOwnerReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewOwnerReportsComponent]
    });
    fixture = TestBed.createComponent(ReviewOwnerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
