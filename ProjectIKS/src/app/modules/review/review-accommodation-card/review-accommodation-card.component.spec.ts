import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAccommodationCardComponent } from './review-accommodation-card.component';

describe('ReviewAccommodationCardComponent', () => {
  let component: ReviewAccommodationCardComponent;
  let fixture: ComponentFixture<ReviewAccommodationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAccommodationCardComponent]
    });
    fixture = TestBed.createComponent(ReviewAccommodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
