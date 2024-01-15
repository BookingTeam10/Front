import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Registration, RegistrationWithoutActivateCode, TypeUser} from "../../../models/registration";
import {environment} from "../../../environment/environment";
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //registerUser
  it('should send a POST request to the server', () => {
    const signUp: Registration = {
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

    service.registration(signUp).subscribe();

    const req = httpMock.expectOne(environment.apiHost+"/register");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.email).toEqual(signUp.email);
    expect(req.request.body.password).toEqual(signUp.password);
    // expect(req.request.body).toEqual({
    //   email: signUp.email,
    //   password: signUp.password,
    //   firstName: signUp.firstName,
    //   lastName: signUp.lastName,
    //   phoneNumber: signUp.phoneNumber,
    //   address: signUp.address,
    //   userType: signUp.userType,
    // });
    req.flush({});
  });

  it('should register user', () => {
    const signUp: Registration = {
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

    service.registration(signUp).subscribe(data => {
      expect(data).toEqual(signUp);
    });
    const req = httpMock.expectOne(environment.apiHost+"/register");
    expect(req.request.method).toBe('POST');
    req.flush(signUp);
  });
});
