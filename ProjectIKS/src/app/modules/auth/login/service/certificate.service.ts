import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Certificate} from "../../../../models/certificate/certificate";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }
  preuzmiSertifikat(email: string): Observable<Blob> {
    return this.http.get(environment.apiPKI + '/certificates/' + email, { responseType: 'blob' });
  }
}
