import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationCardsComponent } from './view-notification-cards.component';

describe('ViewNotificationCardsComponent', () => {
  let component: ViewNotificationCardsComponent;
  let fixture: ComponentFixture<ViewNotificationCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNotificationCardsComponent]
    });
    fixture = TestBed.createComponent(ViewNotificationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
