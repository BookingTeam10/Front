import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAccommodationCreateComponent } from './review-accommodation-create.component';

describe('ReviewAccommodationCreateComponent', () => {
  let component: ReviewAccommodationCreateComponent;
  let fixture: ComponentFixture<ReviewAccommodationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAccommodationCreateComponent]
    });
    fixture = TestBed.createComponent(ReviewAccommodationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
