import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAccommodationComponent } from './review-accommodation.component';

describe('ReviewAccommodationComponent', () => {
  let component: ReviewAccommodationComponent;
  let fixture: ComponentFixture<ReviewAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAccommodationComponent]
    });
    fixture = TestBed.createComponent(ReviewAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
