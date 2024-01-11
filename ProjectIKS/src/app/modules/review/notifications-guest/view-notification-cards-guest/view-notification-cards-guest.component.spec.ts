import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationCardsGuestComponent } from './view-notification-cards-guest.component';

describe('ViewNotificationCardsGuestComponent', () => {
  let component: ViewNotificationCardsGuestComponent;
  let fixture: ComponentFixture<ViewNotificationCardsGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNotificationCardsGuestComponent]
    });
    fixture = TestBed.createComponent(ViewNotificationCardsGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
