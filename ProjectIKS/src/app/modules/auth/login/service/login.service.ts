import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginComponent} from "../login.component";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environment/environment";
import {Login} from "../../../../models/login";
import {AuthResponse} from "../../../../models/auth-response";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();
  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(loginData:Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost+'/users/login', loginData,{
      headers: this.headers,
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      console.log(helper.decodeToken(accessToken).role[0].authority);
      return helper.decodeToken(accessToken).role[0].authority;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}