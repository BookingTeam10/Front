import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {AuthResponse} from "../../../models/auth-response";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  constructor(private http: HttpClient) {
  }
  //gadjamo bekend sa PKI
  requestCertificate(request:any):any {
    return this.http.post<AuthResponse>(environment.apiPKI+'/requestCertificate', request,{
      headers: this.headers,
    });
  }
}
