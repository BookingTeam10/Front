import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {AuthResponse} from "../../../models/auth-response";
import {CertificateRequest} from "../../../models/certificateRequest";

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
  requestCertificate(request:CertificateRequest):any {
    console.log(request)
    return this.http.post<any>(environment.apiPKI+'/certificates', request);
  }
}
