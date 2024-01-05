import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFavouriteAccommodationsComponent } from './guest-favourite-accommodations.component';

describe('GuestFavouriteAccommodationsComponent', () => {
  let component: GuestFavouriteAccommodationsComponent;
  let fixture: ComponentFixture<GuestFavouriteAccommodationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestFavouriteAccommodationsComponent]
    });
    fixture = TestBed.createComponent(GuestFavouriteAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
