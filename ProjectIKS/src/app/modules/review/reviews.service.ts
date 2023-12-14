import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Reservation, Review} from "../../models/reservation";
import {environment} from "../../environment/environment";
import {Accommodation} from "../../models/accommodation";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  reviews$: Observable<Review[]> = this.reviewsSubject.asObservable();

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

}
