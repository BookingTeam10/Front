import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Registration} from "../../../../models/registration";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private registrationResponseSource = new BehaviorSubject<Registration | null>(null);

  currentRegistrationResponse = this.registrationResponseSource.asObservable();

  atribut="1"

  constructor() { }

  changeRegistrationResponse(response: Registration) {
    this.registrationResponseSource.next(response);
  }
  changeRegistrationResponse1(response: Registration) {
    this.atribut=response.activationCode;
  }
}
