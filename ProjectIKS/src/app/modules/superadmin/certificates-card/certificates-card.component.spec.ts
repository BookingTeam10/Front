import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesCardComponent } from './certificates-card.component';

describe('CertificatesCardComponent', () => {
  let component: CertificatesCardComponent;
  let fixture: ComponentFixture<CertificatesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificatesCardComponent]
    });
    fixture = TestBed.createComponent(CertificatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
