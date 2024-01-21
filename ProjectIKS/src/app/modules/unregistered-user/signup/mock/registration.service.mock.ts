import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Registration, TypeUser} from "../../../../models/registration";
import {Observable} from "rxjs";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceMock {

  constructor() { }

  registerUserObs(registration: Registration) {
    return {
      id:null,
      email:"matijap59@gmail.com",
      password:"nekaSifra123",
      firstName: "Matija",
      lastName: "Popovic",
      phoneNumber: "06555555",
      address: "Bulevar oslobodjenja 33",
      userType: TypeUser.GUEST,
      activationCode:""
    };

  }
}
