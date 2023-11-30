import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";
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
    return this.http.post<Registration>(environment.apiHost+'/register',
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
