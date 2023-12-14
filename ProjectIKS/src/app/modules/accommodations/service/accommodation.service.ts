import {Injectable} from '@angular/core';
import {Accommodation, AccommodationStatus} from "../../../models/accommodation";
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
    console.log(environment.apiHost + '/accommodations');
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/accommodations')
  }

  add(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(environment.apiHost + 'add', accommodation)
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + '/accommodations/' + id)
  }

  getApprovalAccommodations(): Accommodation[] {
    // this.getAll();
    //
    // for (let i = 0; i < this.accommodationList.length; i++) {
    //   if (this.accommodationList[i].status === AccommodationStatus.CREATED || this.accommodationList[i].status === AccommodationStatus.EDITED) {
    //     accommodations.push(this.accommodationList[i]);
    //   }
    // }


    return [
      {id : 1, description : "Apartment1",minPeople:3,maxPeople:5, status: AccommodationStatus.CREATED, ownerId: 1},
      {id : 2, description : "Apartment2",minPeople:3,maxPeople:5, status: AccommodationStatus.CREATED, ownerId: 1},
      {id : 3, description : "Room1",minPeople:3,maxPeople:5 , status: AccommodationStatus.EDITED, ownerId: 1},
      {id : 4, description : "Room2",minPeople:3,maxPeople:5, status: AccommodationStatus.APPROVED, ownerId: 1}
    ];
  }
}
