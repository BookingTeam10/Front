import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAccommodationCardsComponent } from './review-accommodation-cards.component';

describe('ReviewAccommodationCardsComponent', () => {
  let component: ReviewAccommodationCardsComponent;
  let fixture: ComponentFixture<ReviewAccommodationCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAccommodationCardsComponent]
    });
    fixture = TestBed.createComponent(ReviewAccommodationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
