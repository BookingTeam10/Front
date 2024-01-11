import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationGuestComponent } from './view-notification-guest.component';

describe('ViewNotificationGuestComponent', () => {
  let component: ViewNotificationGuestComponent;
  let fixture: ComponentFixture<ViewNotificationGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNotificationGuestComponent]
    });
    fixture = TestBed.createComponent(ViewNotificationGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
