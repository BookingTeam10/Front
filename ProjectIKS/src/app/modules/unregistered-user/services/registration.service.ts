import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {enviroment} from "../../../enviroment/enviroment";
import {Registration} from "../../../models/registration";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient) { }

  registration(signUpData: Registration):Observable<Registration> {
    console.log("USLO JE OVDE REG")
    return this.http.post<Registration>(enviroment.apiHost+'/unregistredUsers/register',
      {
        email: signUpData.email,
        password: signUpData.password,
        name: signUpData.name,
        surname: signUpData.surname,
        address: signUpData.address,
        phone: signUpData.phone
      }, {"headers": this.headers})
  }
}
