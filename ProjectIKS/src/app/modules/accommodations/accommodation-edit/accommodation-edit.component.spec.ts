import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationEditComponent } from './accommodation-edit.component';

describe('AccommodationEditComponent', () => {
  let component: AccommodationEditComponent;
  let fixture: ComponentFixture<AccommodationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationEditComponent]
    });
    fixture = TestBed.createComponent(AccommodationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
