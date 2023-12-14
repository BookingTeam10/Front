import { Injectable } from '@angular/core';
import {Accommodation, Amenity} from "../../../models/accommodation";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environment/environment";
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

  getAll(): Observable<Accommodation[]> {
    console.log(environment.apiHost + '/accommodations');
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/accommodations')
  }

  add(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(environment.apiHost + '/add/', accommodation)
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
  getSearchedAccommodations(location?: String, start?: Date, end?: Date, numPeople?: number, minPrice?:number,maxPrice?:number,ammenities?: string[]) : Observable<Accommodation[]> {

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
    // if (minPrice != undefined)
    // {
    //   params = params.append("minPrice", minPrice );
    // }
    // if (maxPrice != undefined)
    // {
    //   params = params.append("maxPrice", maxPrice );
    // }
    // if (ammenities != undefined)
    // {
    //   // @ts-ignore
    //   params = params.append("ammenities", ammenities  );
    // }

    return this.httpClient.get<Accommodation[]>(environment.apiHost + "/accommodations/accommodationsSearch", {params: params});
  }
  updateAccommodations(accommodations: Accommodation[]) {
    this.accommodationsSubject.next(accommodations);
  }

  getAmenityByAccommodation(id: number): Observable<Amenity[]> {
    return this.httpClient.get<Amenity[]>(environment.apiHost + '/accommodations/' + id +'/amenity')
  }
}
