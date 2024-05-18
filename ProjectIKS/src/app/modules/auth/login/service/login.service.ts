import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "../../../../environment/environment";
import {Login} from "../../../../models/login";
import {AuthResponse} from "../../../../models/auth-response";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MessageNotification} from "../../../../models/message";
import {UserServiceService} from "../../../unregistered-user/signup/user-service.service";

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
  constructor(private http: HttpClient, private userService: UserServiceService) {
    this.user$.next(this.getRole());
    // this.user$.next("User");
  }

  login(loginData:Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost+'/users/login', loginData,{
      headers: this.headers,
    });
  }

  loginSuperAdmin(loginData:Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiPKI+'/users/login', loginData,{
      headers: this.headers,
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('User');
      if(accessToken === "Invalid reCAPTCHA"){return "";}
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
    const userRoles = this.getRole();
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

  sub(email:string): Observable<MessageNotification> {
    console.log(email);
    return this.http.get<MessageNotification>(environment.apiHost + '/socket-publisher/'+email);
  }

  isBlocked(): Observable<boolean> {
    if (this.isLoggedIn()) {
      return this.userService.isBlocked(this.getUsername());
    }
    return of(false);
  }

  certificate(email:String):any {
    console.log(email);
    return this.http.get(environment.apiPKI + '/certificates/'+email, { responseType: 'arraybuffer' });  //izmeniti ovo
  }
}
