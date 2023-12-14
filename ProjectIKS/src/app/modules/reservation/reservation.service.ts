import { Injectable } from '@angular/core';
import {Reservation} from "../../models/reservation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationList:Reservation[] = [];
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  public postJSON : any;
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/reservations')
  }
  getRequests(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/guests/request')
  }
  getReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.apiHost + '/reservations/' + id)
  }
  createReservation(reservation?: Reservation): Observable<Object> {
    console.log(this.httpClient);
    console.log(environment.apiHost + '/reservations');
    console.log( reservation);

    return this.httpClient.post<Reservation>(environment.apiHost + '/reservations', reservation, {
      headers: this.headers
    });
  }

  deleteReservation(id: number): Observable<Reservation> {
    return this.httpClient.delete<Reservation>(environment.apiHost + '/guests/request/' + id)
  }

  getByAccommodations(id:number): Observable<Reservation[]> {
    console.log(environment.apiHost + '/'
      +id+'/reservations');
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/reservations/'
      +id+'/reservations')
  }

}
