import { Injectable } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/accommodations')
  }

  add(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(environment.apiHost + 'add', accommodation)
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + '/accommodations/' + id)
  }
}