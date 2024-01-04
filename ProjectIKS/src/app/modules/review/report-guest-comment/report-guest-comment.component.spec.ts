import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGuestCommentComponent } from './report-guest-comment.component';

describe('ReportGuestCommentComponent', () => {
  let component: ReportGuestCommentComponent;
  let fixture: ComponentFixture<ReportGuestCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportGuestCommentComponent]
    });
    fixture = TestBed.createComponent(ReportGuestCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
