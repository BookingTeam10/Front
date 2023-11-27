import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorNavbarComponent } from './administrator-navbar.component';

describe('AdministratorNavbarComponent', () => {
  let component: AdministratorNavbarComponent;
  let fixture: ComponentFixture<AdministratorNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorNavbarComponent]
    });
    fixture = TestBed.createComponent(AdministratorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
