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
  createReservation(reservation: Reservation): Observable<Reservation> {
    console.log("udje u funkciju")
    console.log(reservation);
    console.log(environment.apiHost + '/guests/reservations');
    return this.httpClient.post<Reservation>(environment.apiHost + '/guests/reservations', reservation)
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

  getOwnerReservations(id: number):Observable<Reservation[]>{
      return this.httpClient.get<Reservation[]>(environment.apiHost + '/reservations/owner/' + id)
  }
  acceptReservation(reservationId: number): Observable<Object> {
        return this.httpClient.put(environment.apiHost + "/reservations/accept/" + reservationId, {});
  }

  rejectReservation(reservationId: number) {
      return this.httpClient.put(environment.apiHost + "/reservations/cancel/" + reservationId + "?canceledByHost=true", {});
  }
}
