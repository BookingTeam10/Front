import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginComponent} from "../login.component";
import {Observable} from "rxjs";
import {environment} from "../../../../environment/environment";
import {Login} from "../../../../models/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginData:Login): Observable<Login> {
    console.log("USLO JE OVDE WEB")
    console.log(loginData.email,loginData.password)
    return this.http.post<Login>(environment.apiHost+'/users/login', loginData);
  }
}
