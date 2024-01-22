import { Injectable } from '@angular/core';
import {Reservation, Report, ReportAccommodation} from "../../models/reservation";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Accommodation} from "../../models/accommodation";
import {LoginService} from "../auth/login/service/login.service";
import {Owner} from "../../models/users/owner";
import {UserServiceService} from "../unregistered-user/signup/user-service.service";
import {Registration} from "../../models/registration";

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
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();


  constructor(private httpClient: HttpClient,public loginService:LoginService,private userService:UserServiceService) {
    // this.userService.getOwner(this.loginService.getUsername()).subscribe(
    //   (owner: Owner) => {
    //     this.getOwnersRequests(owner.id).subscribe({
    //       next: (data: Reservation[]) => {
    //         this.reservationsSubject.next(data);
    //       },
    //       error: (_) => {
    //         console.log("Greska!")
    //       }
    //     });
    //   });
  }
  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/reservations')
  }
  getRequests(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/guests/request')
  }
  getReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.apiHost + '/reservations/' + id)
  }
  reservationCreateObs(reservation: Reservation):any {
    this.createReservation(reservation).subscribe(
      (response) => {
        console.log('Rezervacija uspešno kreirana');
      }
    );
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    console.log(reservation);
    return this.httpClient.post<Reservation>(environment.apiHost + '/guests/reservations', reservation)
  }
  deleteReservation(id: number): Observable<Reservation> {
    return this.httpClient.delete<Reservation>(environment.apiHost + '/guests/request/' + id)
  }

  getByAccommodations(id:number): Observable<Reservation[]> {
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

  getOwnersRequests(ownerId: number): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/owners/'+ownerId+ '/requestsReservations')
  }

  getSearchedRequests(type?: string | null, startDate?: Date | null, endDate?: Date | null, nameAccommodation?: string,idOwner?:number) : Observable<Reservation[]> {
    let params = new HttpParams();
    if (type != undefined)
    {
      params = params.append("type", type );
    }
    if (startDate != undefined) {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      params = params.append('start', formattedStartDate);
    }

    if (endDate != undefined) {
      const formattedEndDate = endDate.toISOString().split('T')[0];
      params = params.append('end', formattedEndDate);
    }
    if ( nameAccommodation != undefined)
    {
      params = params.append("nameAccommodation",  nameAccommodation );
    }
    if ( idOwner!= undefined)
    {
      params = params.append("idOwner",  idOwner );
    }

    return this.httpClient.get<Reservation[]>(environment.apiHost + "/owners/requestsSearch", {params: params});
  }
  updateReservations(reservations: Reservation[]) {
    this.reservationsSubject.next(reservations);
  }

  getGuestReservations(id: number) {
      return this.httpClient.get<Reservation[]>(environment.apiHost + "/guests/" + id + "/requests")
  }

  cancelReservation(id: number) {
    return this.httpClient.put(environment.apiHost + "/reservations/cancel/" + id, {});
  }

  getGuestRequests(guestId: number): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + '/guests/'+guestId+'/requests')
  }
  getOwnerReports(id: number, startDate: Date | null, endDate: Date | null) {
    let params = new HttpParams();
      if (startDate != undefined) {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        params = params.append('start', formattedStartDate);
      }

      if (endDate != undefined) {
        const formattedEndDate = endDate.toISOString().split('T')[0];
        params = params.append('end', formattedEndDate);
      }
    return this.httpClient.get<Report[]>(environment.apiHost + "/owners/"+id+"/report", {params: params});
  }

  getOwnerReportsAccommodation(idAccommodation: number) {
    return this.httpClient.get<ReportAccommodation>(environment.apiHost + "/owners/"+idAccommodation+"/reportYear");
  }
}
