import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Reservation, Review} from "../../models/reservation";
import {environment} from "../../environment/environment";
import {Accommodation} from "../../models/accommodation";
import {Owner} from "../../models/users/owner";
import {AddReviewOwner, ReviewOwner} from "../../models/reviewOwner";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  private ownersSubject = new BehaviorSubject<Owner[]>([]);

  private accommodationsSubject = new BehaviorSubject<Accommodation[]>([]);

  reviews$: Observable<Review[]> = this.reviewsSubject.asObservable();

  owners$: Observable<Owner[]> = this.ownersSubject.asObservable();

  accommodations$: Observable<Accommodation[]> = this.accommodationsSubject.asObservable();

  private ownerId: number;
  private guestId: number | undefined;

  setOwnerAndGuest(ownerId: number, guestId: number | undefined) {
    this.ownerId = ownerId;
    this.guestId = guestId;
  }

  getOwnerAndGuest() {
    return { ownerId: this.ownerId, guestId: this.guestId };
  }

  constructor(private httpClient: HttpClient) {
    this.getAll().subscribe({
      next: (data: Review[]) => {
        this.reviewsSubject.next(data);
      },
      error: (error) => {
        console.error("Greška pri dohvatanju smeštaja", error);
      }
    });

  }
  getAll(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + '/reviews')
  }

  getByReservations(id: number | undefined): Observable<Review> {
    return this.httpClient.get<Review>(environment.apiHost + '/reviews/'
      +id+'/reviews')
  }

  getGuestOwner(id: number | undefined):Observable<Owner[]> {
    return this.httpClient.get<Owner[]>(environment.apiHost + '/reviews/rate/' +id)
  }

  getAccommodation(id: number | undefined):Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/reviews/rateAccommodation/' +id)
  }

  getRate(idOwner: number, idGuest: number | undefined):Observable<ReviewOwner[]> {
    console.log(environment.apiHost + '/reviews/rate/' +idOwner+idGuest);
    return this.httpClient.get<ReviewOwner[]>(environment.apiHost + '/reviews/rate/' +idOwner+"/"+idGuest)
  }

  getRateNew(idOwner: number, idGuest: number | undefined):Observable<ReviewOwner> {
    console.log(environment.apiHost + '/reviews/rate/' +idOwner+idGuest);
    return this.httpClient.get<ReviewOwner>(environment.apiHost + '/reviews/rate/' +idOwner+"/"+idGuest)
  }

  add(a: AddReviewOwner, idOwner:number,idGuest:number | undefined): Observable<ReviewOwner> {
    console.log("SLANJE")
    console.log(a)
    console.log(idOwner)
    console.log(idGuest)
    return this.httpClient.post<ReviewOwner>(environment.apiHost + '/reviews/rate/' +idOwner+"/"+idGuest,a)
  }

  deleteReview(idOwner: number, idGuest: number | undefined):Observable<AddReviewOwner> {
    console.log(environment.apiHost + '/reviews/rate/' + idOwner+"/"+idGuest)
    return this.httpClient.delete<AddReviewOwner>(environment.apiHost + '/reviews/rate/' + idOwner+"/"+idGuest);
  }

  getRateById(idReview: number):Observable<AddReviewOwner> {
    console.log("POSTUJ")
    console.log(idReview);
    return this.httpClient.get<AddReviewOwner>(environment.apiHost + '/reviews/rate/reviewOwner/'+idReview);
  }
}
