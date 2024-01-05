import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAccommodationDetailsComponent } from './review-accommodation-details.component';

describe('ReviewAccommodationDetailsComponent', () => {
  let component: ReviewAccommodationDetailsComponent;
  let fixture: ComponentFixture<ReviewAccommodationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAccommodationDetailsComponent]
    });
    fixture = TestBed.createComponent(ReviewAccommodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
