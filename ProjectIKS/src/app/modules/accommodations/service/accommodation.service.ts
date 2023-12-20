import { Injectable } from '@angular/core';
import {Accommodation, Amenity} from "../../../models/accommodation";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import { AccommodationStatus} from "../../../models/accommodation";
import {environment} from "../../../environment/environment";
import {AddAccommodation} from "../../../models/addAccommodation";
import {Reservation} from "../../../models/reservation";


@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];
  private accommodationsSubject = new BehaviorSubject<Accommodation[]>([]);

  accommodations$ = this.accommodationsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getAll().subscribe({
      next: (data: Accommodation[]) => {
        this.accommodationsSubject.next(data); // Emitujte inicijalne podatke
        console.log(data);
      },
      error: (error) => {
        console.error("Greška pri dohvatanju smeštaja", error);
      }
    });
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  getAll(): Observable<Accommodation[]> {
    console.log(environment.apiHost + '/accommodations');
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/accommodations')
  }

  add(accommodation: Accommodation): Observable<Accommodation> {

    return this.httpClient.post<Accommodation>(environment.apiHost + '/accommodations/add', accommodation)
  }
  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + '/accommodations/' + id)
  }

  // getSearchedAccommodations(location?: String, start?: Date, end?: Date, numPeople?: number) : Observable<Accommodation[]> {
  //
  //   let params = new HttpParams();
  //   if (location != undefined)
  //   {
  //     // @ts-ignore
  //     params = params.append("location", location );
  //   }
  //   if (numPeople != undefined)
  //   {
  //     params = params.append("numPeople", numPeople );
  //   }
  //
  //   return this.httpClient.get<Accommodation[]>(environment.apiHost + "/accommodations/accommodationsSearch", {params: params});
  // }

  private accommodations: Accommodation[];
  getSearchedAccommodations(location?: string, start?: Date, end?: Date, numPeople?: number, minPrice?:string,maxPrice?:string,amenities?: string[]) : Observable<Accommodation[]> {
    console.log("ABC");
    console.log(amenities);
    let params = new HttpParams();
    if (location != undefined)
    {
      // @ts-ignore
      params = params.append("location", location );
    }
    if (numPeople != undefined)
    {
      params = params.append("numPeople", numPeople );
    }
    if (minPrice != undefined)
    {
      params = params.append("minPrice", minPrice );
    }
    if (maxPrice != undefined)
    {
      params = params.append("maxPrice", maxPrice );
    }
    if (amenities != undefined)
    {

      // @ts-ignore
      params = params.append("amenities", amenities  );
    }

    return this.httpClient.get<Accommodation[]>(environment.apiHost + "/accommodations/accommodationsSearch", {params: params});
  }
  updateAccommodations(accommodations: Accommodation[]) {
    this.accommodationsSubject.next(accommodations);
  }

  getAmenityByAccommodation(id: number): Observable<Amenity[]> {
    return this.httpClient.get<Amenity[]>(environment.apiHost + '/accommodations/' + id + '/amenity')
  }

  getApprovalAccommodations() {
    return this.getAll();
  }

  approveAccommodation(id: number) {
      return this.httpClient.post(environment.apiHost + "/accommodations/approve/" + id, {});
  }

  rejectAccommodation(id: number) {
    return this.httpClient.post(environment.apiHost + "/accommodations/reject/" + id,{});
  }

  updateAccommodation(accommodation: Accommodation) {
      return this.httpClient.put(environment.apiHost + "/accommodations/" + accommodation.id, accommodation);
  }

  getOwnerAccommodations(id: number): Observable<Accommodation[]> {
      return this.httpClient.get<Accommodation[]>(environment.apiHost + "/owners/" + id + "/accommodations");
  }
}
