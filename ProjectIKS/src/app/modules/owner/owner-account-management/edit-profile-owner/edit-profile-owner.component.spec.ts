import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileOwnerComponent } from './edit-profile-owner.component';

describe('EditProfileOwnerComponent', () => {
  let component: EditProfileOwnerComponent;
  let fixture: ComponentFixture<EditProfileOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileOwnerComponent]
    });
    fixture = TestBed.createComponent(EditProfileOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
