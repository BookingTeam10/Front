import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {RegistrationService} from "../services/registration.service";
import {DebugElement} from "@angular/core";
import {Registration, TypeUser} from "../../../models/registration";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";
import {MatRadioChange} from "@angular/material/radio";
import {UnregisteredUserModule} from "../unregistered-user.module";
import {Observable} from "rxjs";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let registrationService: RegistrationService;
  let registrationServiceSpy: jasmine.Spy;

  const response  = {
    id:500,
    email:"matijap59@gmail.com",
    password:"nekaSifra123",
    firstName: "Matija",
    lastName: "Popovic",
    phoneNumber: "06555555",
    address: "Bulevar oslobodjenja 33",
    userType: TypeUser.GUEST,
    activationCode:""
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports:[
        UnregisteredUserModule,HttpClientTestingModule, HttpClientModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule
      ],
      providers:[SignupComponent,RegistrationService]
    }).compileComponents();

    registrationService=TestBed.inject(RegistrationService);
    registrationServiceSpy = spyOn(registrationService, 'registerUserObs').and.returnValue(response);

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should set submitted to true`, () => {
    component.registerClicked();
    expect(component.submitted).toBeTruthy();
  });

  it(`should not call the registerClicked when button disabled`,() => {
    spyOn(component, 'registerClicked');
    el = fixture.debugElement.query(By.css('#registerbtn')).nativeElement;
    el.click();
    expect(component.registerClicked).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid for wrong mail format`, () => {
    component.signUp.controls['email'].setValue('Matija');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06666666666');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`form should be incorrect for wrong mail format`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('ab');
    component.signUp.controls['confirmPassword'].setValue('ab');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06666666666');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`form should be incorrect for different password format`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifar123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06666666666');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`form should be incorrect for name has number format`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija1');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06666666666');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`form should be incorrect for surname has number format`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic1');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06666666666');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`form should be incorrect for phone has letter format`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic1');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06666B666666A');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`form should be incorrect for phone has less than 6 caracters or more than 20 caracters`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('066');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`no selected role`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('066');
    component.signUp.controls['userType'].setValue("");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeFalsy();
  });

  it(`valid`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 34');
    component.signUp.controls['phone'].setValue('06555555');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    expect(component.signUp.valid).toBeTruthy();
  });

  it(`form should be valid and request is sent`, () => {
    component.signUp.controls['email'].setValue('matijap59@gmail.com');
    component.signUp.controls['password'].setValue('Sifra123');
    component.signUp.controls['confirmPassword'].setValue('Sifra123');
    component.signUp.controls['name'].setValue('Matija');
    component.signUp.controls['surname'].setValue('Popovic');
    component.signUp.controls['address'].setValue('Bulevar Oslobodjenja 33');
    component.signUp.controls['phone'].setValue('06555555');
    component.signUp.controls['userType'].setValue("GUEST");
    component.onUserTypeChange({ value: "GUEST" } as MatRadioChange);
    component.registerClicked();

    expect(registrationServiceSpy).toHaveBeenCalled();

    const value = registrationServiceSpy.calls.mostRecent().returnValue;
    expect(value.email).toBe("matijap59@gmail.com");
  });


});
