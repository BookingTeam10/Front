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
    // this.user$.next("User");
  }

  login(loginData:Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost+'/users/login', loginData,{
      headers: this.headers,
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('User');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role[0].authority;
    }
    return 'User';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('User') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
  public hasRole(requiredRole: string): boolean {
    const userRoles = this.getRole(); // Dohvatite role iz JWT tokena
    return userRoles.includes(requiredRole);
  }

  private loginSuccessSubject = new BehaviorSubject<string>("");
  loginSuccess$ = this.loginSuccessSubject.asObservable();

  updateLoginSuccess(status: string) {
    this.loginSuccessSubject.next(status);
  }

  get currentLoginSuccess(): string {
    return this.loginSuccessSubject.getValue();
  }

  getUsername(): string{

    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('User');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).sub;
    }

    return "";
  }
  logout(): Observable<Boolean> {
    return this.http.get<any>(environment.apiHost + '/users/logout');
  }
}
