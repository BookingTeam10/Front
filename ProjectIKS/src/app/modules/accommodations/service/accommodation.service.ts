import { Injectable } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";
import {AddAccommodation} from "../../../models/addAccommodation";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];
  constructor(private httpClient: HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  getAll(): Observable<Accommodation[]> {
    console.log(environment.apiHost + '/accommodations');
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/accommodations')
  }

  add(accommodation: Accommodation): Observable<Accommodation> {
    console.log("ACCOMMODATION")
    console.log(accommodation)
    const s=""
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Accommodation>(
      environment.apiHost + '/accommodations',
      JSON.stringify(s),
      { headers: headers })
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + '/accommodations/' + id)
  }
  addAccommodation(accommodation: AddAccommodation): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(environment.apiHost + 'add', accommodation)
  }

}
