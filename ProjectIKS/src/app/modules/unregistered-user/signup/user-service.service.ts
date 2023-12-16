import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../../../models/accommodation";
import {environment} from "../../../environment/environment";
import {AuthResponse} from "../../../models/auth-response";
import {Message} from "../../../models/message";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  constructor(private httpClient: HttpClient,private router: Router) { }

  // activate(code: string): Observable<string> {
  //   console.log(code);
  //   console.log(environment.apiHost)
  //   return this.httpClient.post<string>(environment.apiHost+ '/activate/'+ code,{
  //     headers: this.headers,
  //   });
  // }

  activate(code: string): Observable<string> {
    this.router.navigate(['/users/login']);
    return this.httpClient.post<string>(
      `${environment.apiHost}/activate/${code}`,
      {
        headers: this.headers, responseType: 'text'
      }
    );
  }
}
