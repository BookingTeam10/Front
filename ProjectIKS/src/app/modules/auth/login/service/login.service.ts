import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginComponent} from "../login.component";
import {Observable} from "rxjs";
import {enviroment} from "../../../../enviroment/enviroment";
import {Login} from "../../../../models/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginData:Login): Observable<Login> {
    console.log("USLO JE OVDE WEB")
    console.log(loginData.email,loginData.password)
    return this.http.post<Login>(enviroment.apiHost+'/users/login', loginData);
  }
}
