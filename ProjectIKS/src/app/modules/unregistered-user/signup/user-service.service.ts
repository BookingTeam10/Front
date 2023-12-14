import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../../../models/accommodation";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  constructor(private httpClient: HttpClient) { }

  // activate(code: string): Observable<string> {
  //   console.log(code);
  //   console.log(environment.apiHost)
  //   return this.httpClient.post<string>(environment.apiHost+ '/activate/'+ code,{
  //     headers: this.headers,
  //   });
  // }

  activate(code: string): Observable<string> {
    return this.httpClient.post<string>(
      `${environment.apiHost}/activate/${code}`,
      {
             headers: this.headers, responseType: 'text'
           }
      //null // Ako nema tela zahteva, ovde možete poslati null ili prazan objekat
    );
  }
}
