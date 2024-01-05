import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterReviewComponent } from './filter-review.component';

describe('FilterReviewComponent', () => {
  let component: FilterReviewComponent;
  let fixture: ComponentFixture<FilterReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterReviewComponent]
    });
    fixture = TestBed.createComponent(FilterReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
