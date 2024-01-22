import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Admin } from "../../../models/users/user";
import { UserServiceService } from "../../unregistered-user/signup/user-service.service";
import {RegistrationService} from "../../unregistered-user/services/registration.service";
import {Owner} from "../../../models/users/owner";
import {MockLoginService} from "./mock/login-mock.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Guest} from "../../../models/users/guest";
import { NgZone } from '@angular/core';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let userServiceSpy: jasmine.SpyObj<UserServiceService>;
  let loginServiceMock: MockLoginService;

  beforeEach(waitForAsync(() => {
    loginServiceMock = new MockLoginService();

    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: UserServiceService, useValue: jasmine.createSpyObj('UserServiceService', ['getAdmin', 'update','getOwner', 'getGuest']) },
        { provide: LoginService, useValue: loginServiceMock },

      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserServiceService) as jasmine.SpyObj<UserServiceService>;
  }));




  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.profileForm).toBeDefined();
    expect(component.profileForm.controls['email']).toBeDefined();
    expect(component.profileForm.controls['name']).toBeDefined();
    expect(component.profileForm.controls['surname']).toBeDefined();
    expect(component.profileForm.controls['address']).toBeDefined();
    expect(component.profileForm.controls['phone']).toBeDefined();
    expect(component.profileForm.controls['createdNotification']).toBeDefined();
    expect(component.profileForm.controls['cancelledNotification']).toBeDefined();
    expect(component.profileForm.controls['notificationRateMe']).toBeDefined();
    expect(component.profileForm.controls['notificationRateAccommodation']).toBeDefined();
    expect(component.profileForm.controls['turnNotificationOn']).toBeDefined();
    expect(component.profileForm.controls['password']).toBeDefined();
    expect(component.profileForm.controls['confirmPassword']).toBeDefined();
  });

  it('should set initial values for the form for owner', fakeAsync(() => {
    const ownerData: Owner = {
      email: 'popovic.sv4.2021@uns.ac.rs',
      id: 1,
      password: 'abc',
      rateMeNotification: true,
      rateAccommodationNotification: true,
      name: 'Luka',
      surname: 'Popovic',
      phone: '0655197633',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true
    };

    loginServiceMock.setUsername(ownerData.email);
    loginServiceMock.setRole("ROLE_Owner");
    userServiceSpy.getOwner.and.returnValue(of(ownerData));

    tick();

    component.loadInitialValues();

    tick();

    expect(component.profileForm.value).toEqual({
      email: ownerData.email,
      name: ownerData.name,
      surname: ownerData.surname,
      address: ownerData.address,
      phone: ownerData.phone,
      createdNotification: ownerData.createdNotification,
      cancelledNotification: ownerData.cancelledNotification,
      turnNotificationOn: false,
      notificationRateMe: ownerData.rateMeNotification,
      notificationRateAccommodation: ownerData.rateAccommodationNotification,
      password: '',
      confirmPassword: ''
    });
  }));


  it('should set initial values for the form for guest', fakeAsync(() => {
    const guestData: Guest = {
      email: 'aleksa@gmail.com',
      blocked: false,
      favouriteAccommodations: [],
      numberCanceledReservation: 0,
      reported: false,
      id: 3,
      password: 'abc',
      name: 'Aleksa',
      surname: 'Janjic',
      phone: '854574324',
      address: 'Bulevar',
      turnOnNotification: true
    };

    loginServiceMock.setUsername(guestData.email);
    loginServiceMock.setRole("ROLE_Guest");
    userServiceSpy.getGuest.and.returnValue(of(guestData));

    tick();

    component.loadInitialValues();

    tick();

    expect(component.profileForm.value).toEqual({
      email: guestData.email,
      name: guestData.name,
      surname: guestData.surname,
      address: guestData.address,
      phone: guestData.phone,
      turnNotificationOn: guestData.turnOnNotification,
      password: "",
      confirmPassword: '',
      createdNotification: false,
      cancelledNotification: false,
      notificationRateMe: false,
      notificationRateAccommodation: false
    });
  }));

  it('should set initial values for the form for admin', fakeAsync(() => {
    const adminData: Admin = {
      email: 'popovic.sv5.2021@uns.ac.rs',
      id: 2,
      password: 'abc',
      name: 'Matija',
      surname: 'Popovic',
    };

    loginServiceMock.setUsername(adminData.email);
    loginServiceMock.setRole("ROLE_Administrator");
    userServiceSpy.getAdmin.and.returnValue(of(adminData));

    tick();

    component.loadInitialValues();

    tick();

    expect(component.profileForm.value).toEqual({
      email: adminData.email,
      name: adminData.name,
      surname: adminData.surname,
      address: "",
      phone: "",
      turnNotificationOn: false,
      password: "",
      confirmPassword: '',
      createdNotification: false,
      cancelledNotification: false,
      notificationRateMe: false,
      notificationRateAccommodation: false
    });
  }));

  it('should show error when owners email is invalid', fakeAsync(() => {
    const formValues = {
      email: 'invalid-email',
      password: 'abc',
      name: 'Luka',
      surname: 'Popovic',
      phone: '0655197633',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true,
      notificationRateMe: false,
      notificationRateAccommodation: false,
      turnNotificationOn: false,
      confirmPassword: "",
    };
    component.profileForm.setValue(formValues);


    component.onSubmit();

    tick();


    expect(userServiceSpy.update).not.toHaveBeenCalled();

  }));

  it('should show error when owners name is invalid', fakeAsync(() => {
    const formValues = {
      email: 'popovic.sv4.2021@uns.ac.rs',
      password: 'abc',
      name: 'Luka1234',
      surname: 'Popovic',
      phone: '0655197633',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true,
      notificationRateMe: false,
      notificationRateAccommodation: false,
      turnNotificationOn: false,
      confirmPassword: "",
    };
    component.profileForm.setValue(formValues);


    component.onSubmit();

    tick();


    expect(userServiceSpy.update).not.toHaveBeenCalled();

  }));

  it('should show error when owners surname is invalid', fakeAsync(() => {
    const formValues = {
      email: 'popovic.sv4.2021@uns.ac.rs',
      password: 'abc',
      name: 'Luka',
      surname: 'Popovic231123',
      phone: '0655197633',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true,
      notificationRateMe: false,
      notificationRateAccommodation: false,
      turnNotificationOn: false,
      confirmPassword: "",
    };
    component.profileForm.setValue(formValues);


    component.onSubmit();

    tick();


    expect(userServiceSpy.update).not.toHaveBeenCalled();

  }));

  it('should show error when owners phone is invalid', fakeAsync(() => {
    const formValues = {
      email: 'popovic.sv4.2021@uns.ac.rs',
      password: 'abc',
      name: 'Luka',
      surname: 'Popovic',
      phone: '0655197633aaa',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true,
      notificationRateMe: false,
      notificationRateAccommodation: false,
      turnNotificationOn: false,
      confirmPassword: "",
    };
    component.profileForm.setValue(formValues);


    component.onSubmit();

    tick();


    expect(userServiceSpy.update).not.toHaveBeenCalled();

  }));

  it('should work when owners data is valid', fakeAsync(() => {
    const formValues = {
      email: 'popovic.sv4.2021@uns.ac.rs',
      password: 'abc',
      name: 'Lukaaaaa',
      surname: 'Popovic',
      phone: '0655197633',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true,
      notificationRateMe: false,
      notificationRateAccommodation: false,
      turnNotificationOn: false,
      confirmPassword: 'abc',
    };

    userServiceSpy.update.and.returnValue(of(false));
    const ownerData: Owner = {
      email: 'popovic.sv4.2021@uns.ac.rs',
      id: 1,
      password: 'abc',
      rateMeNotification: true,
      rateAccommodationNotification: true,
      name: 'Luka',
      surname: 'Popovic',
      phone: '0655197633',
      address: 'Adresa1',
      createdNotification: true,
      cancelledNotification: true
    };

    const guestData: Guest = {
      email: 'aleksa@gmail.com',
      blocked: false,
      favouriteAccommodations: [],
      numberCanceledReservation: 0,
      reported: false,
      id: 3,
      password: 'abc',
      name: 'Aleksa',
      surname: 'Janjic',
      phone: '854574324',
      address: 'Bulevar',
      turnOnNotification: true
    };
    const adminData: Admin = {
      email: 'popovic.sv5.2021@uns.ac.rs',
      id: 2,
      password: 'abc',
      name: 'Matija',
      surname: 'Popovic',
    };

    loginServiceMock.setUsername(ownerData.email);
    loginServiceMock.setRole("ROLE_Owner");

    const exitPageSpy = spyOn(component, 'exitPage').and.stub();

    component.owner =  ownerData;
    component.oldUsername = ownerData.email;
    component.guest = guestData;
    component.admin = adminData;
    component.profileForm.setValue(formValues);

    component.ngZone.run(() => {
      component.onSubmit();
    });

    tick();

    expect(userServiceSpy.update).toHaveBeenCalled();
  }));
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
