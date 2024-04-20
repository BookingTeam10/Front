import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Certificate} from "../../../../models/certificate/certificate";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  // getCertificates(username:string): Observable<> {
  //   return this.http.get<Certificate[]>('https://localhost:8081/api/users/'+username);
  // }

  getCertificateByEmail(username: string): Observable<HttpResponse<Blob>> {
    return this.http.get('https://localhost:8081/api/users/' + username, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
