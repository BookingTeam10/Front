import { Component } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-unregistered-user-home',
  templateUrl: './unregistered-user-home.component.html',
  styleUrls: ['./unregistered-user-home.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class UnregisteredUserHomeComponent {
  constructor(private http: HttpClient) { }

  // getSearchedAccommodations(city?:string) : Observable<Accommodation> {
  //
  //   let params = new HttpParams();
  //
  //   if (city != undefined)
  //     params = params.append("", city);
  //
  //   if (from != undefined) {
  //     params = params.append("from", from);
  //     params = params.append("to", to);
  //   }
  //
  //   if (page != undefined) {
  //     params = params.append('page', page);
  //     params = params.append('size', size);
  //   }
  //   return this.http.get<RidePaginated>(environment.apiHost + "api/passenger/" + id + "/ride", {
  //     params: params
  //   });
  // }
}
