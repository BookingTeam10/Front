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
    return this.http.post<Registration>(environment.apiHost+'/register', signUpData, {"headers": this.headers})
  }
}
