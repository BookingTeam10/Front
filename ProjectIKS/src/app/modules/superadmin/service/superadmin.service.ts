import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {AuthResponse} from "../../../models/auth-response";
import {CertificateRequest} from "../../../models/certificateRequest";
import {BehaviorSubject, Observable} from "rxjs";
import {Accommodation} from "../../../models/accommodation";
import {RequestDTO} from "../../../models/request";
import {User} from "../../../models/users/user";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  public requestsSubject = new BehaviorSubject<any[]>([]);

  requests$ = this.requestsSubject.asObservable();
  public certificateSubject = new BehaviorSubject<any[]>([]);
   constructor(private http: HttpClient) {
  }

  getAll(): Observable<CertificateRequest[]> {
    console.log("AAAADDW")
    return this.http.get<CertificateRequest[]>(environment.apiPKI+ '/certificates/get-requests')
  }

  getAllCertificates():Observable<any[]> {
    return this.http.get<any[]>(environment.apiPKI + '/certificates/get-issuer');
  }

  requestCertificate(request:CertificateRequest):any {
    return this.http.post<any>(environment.apiPKI+'/certificates', request);
  }
  // addCertificate(request: any):any {
  //   return this.http.post(environment.apiPKI + '/certificates/add-request', request)
  // }

  addRequest(request: any):any {
    return this.http.post(environment.apiPKI + '/certificates/add-request', request)
  }
  getTree():any{
    return this.http.get(environment.apiPKI + '/certificates/get-issuer')
  }

  generateKeyPair(commonName: string, user: null): Observable<Map<string, string>> {
    const requestBody = {
      user: user
    };
    return this.http.post<Map<string, string>>(environment.apiPKI +`/certificates/generateKeyPair/${commonName}`, requestBody);
  }

  addCertificate(request: any):any {
     console.log(environment.apiPKI + '/certificates/generateCertificate')
    return this.http.post(environment.apiPKI + '/certificates/generateCertificate', request)
  }

  declineCertificate(id: number): Observable<any> {
    return this.http.delete(environment.apiPKI + '/certificates/'+ id);
  }
}
