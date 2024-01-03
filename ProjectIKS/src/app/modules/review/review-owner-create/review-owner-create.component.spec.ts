import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOwnerCreateComponent } from './review-owner-create.component';

describe('ReviewOwnerCreateComponent', () => {
  let component: ReviewOwnerCreateComponent;
  let fixture: ComponentFixture<ReviewOwnerCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewOwnerCreateComponent]
    });
    fixture = TestBed.createComponent(ReviewOwnerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
