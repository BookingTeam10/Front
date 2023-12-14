import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationEditComponent } from './accomodation-edit.component';

describe('AccomodationEditComponent', () => {
  let component: AccomodationEditComponent;
  let fixture: ComponentFixture<AccomodationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccomodationEditComponent]
    });
    fixture = TestBed.createComponent(AccomodationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
