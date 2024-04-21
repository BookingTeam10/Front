import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {AuthResponse} from "../../../models/auth-response";
import {CertificateRequest} from "../../../models/certificateRequest";
import {BehaviorSubject, Observable} from "rxjs";
import {Accommodation} from "../../../models/accommodation";
import {RequestDTO} from "../../../models/request";

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
   constructor(private http: HttpClient) {
  }

  getAll(): Observable<RequestDTO[]> {
    return this.http.get<RequestDTO[]>(environment.apiPKI+ '/certificates/get-requests')
  }

  requestCertificate(request:CertificateRequest):any {
    console.log(request)
    return this.http.post<any>(environment.apiPKI+'/certificates', request);
  }
  addCertificate(request: any):any {
     console.log("UDJE FUNKCIJA")
    return this.http.post(environment.apiPKI + '/certificates', request)
  }
}
