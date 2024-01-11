import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Reservation, Review, Review1} from "../../models/reservation";
import {environment} from "../../environment/environment";
import {Accommodation} from "../../models/accommodation";
import {Owner} from "../../models/users/owner";
import {AddReviewOwner, ReportUser, ReportUserExtended, ReviewOwner} from "../../models/reviewOwner";
import {Guest} from "../../models/users/guest";
import {NotificationVisible} from "../../models/notification";
import {MessageNotification} from "../../models/message";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  private ownersSubject = new BehaviorSubject<Owner[]>([]);

  private guestsSubject = new BehaviorSubject<Guest[]>([]);

  private accommodationsSubject = new BehaviorSubject<Accommodation[]>([]);

  private commentGuestsSubject = new BehaviorSubject<AddReviewOwner[]>([]);

  private notificationsSubject = new BehaviorSubject<NotificationVisible[]>([]);

  reviews$: Observable<Review[]> = this.reviewsSubject.asObservable();

  owners$: Observable<Owner[]> = this.ownersSubject.asObservable();

  guests$: Observable<Guest[]> = this.guestsSubject.asObservable();

  accommodations$: Observable<Accommodation[]> = this.accommodationsSubject.asObservable();

  commentsGuests$: Observable<AddReviewOwner[]> = this.commentGuestsSubject.asObservable();

  notifications$: Observable<NotificationVisible[]> = this.notificationsSubject.asObservable();

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
    return this.httpClient.get<Accommodation[]>(environment.apiHost + '/reviews/rate/reviewAccommodation/' +id)
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

  deleteReview(idOwner: number | undefined, idGuest: number | undefined):Observable<AddReviewOwner> {
    console.log(environment.apiHost + '/reviews/rateDelete/' + idOwner+"/"+idGuest)
    return this.httpClient.delete<AddReviewOwner>(environment.apiHost + '/reviews/rateDelete/' + idOwner+"/"+idGuest);
  }

  getRateById(idReview: number):Observable<AddReviewOwner> {
    console.log("POSTUJ")
    console.log(idReview);
    return this.httpClient.get<AddReviewOwner>(environment.apiHost + '/reviews/rate/reviewOwner/'+idReview);
  }

  getGuests(id: number):Observable<Guest[]> {
    return this.httpClient.get<Guest[]>(environment.apiHost + '/reviews/reportGuest/' +id)
  }

  getComments(id: number):Observable<AddReviewOwner[]> {
    return this.httpClient.get<AddReviewOwner[]>(environment.apiHost + '/reviews/reportGuestComment/' +id)
  }

  getAccommodationComments(id: number):Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + '/reviews/reportAccommodationComment/' +id)
  }

  addReport(a: ReportUser, idOwner: number, idGuest: number | undefined):Observable<ReportUser> {
    console.log("SLANJE")
    console.log(a)
    console.log(idOwner)
    console.log(idGuest)
    return this.httpClient.post<ReportUser>(environment.apiHost + '/reportUser/' +idOwner+"/"+idGuest,a)
  }

  getReportGO(idOwner: number, idGuest: number | undefined):Observable<ReportUser> {
      return this.httpClient.get<ReportUser>(environment.apiHost + '/reportUser/GO/' +idOwner+"/"+idGuest)
  }

  getReportOG(idOwner: number, idGuest: number | undefined):Observable<ReportUser> {
    return this.httpClient.get<ReportUser>(environment.apiHost + '/reportUser/OG/' +idOwner+"/"+idGuest)
  }

  getReviewOwner(id: number | undefined):Observable<AddReviewOwner> {
    return this.httpClient.get<AddReviewOwner>(environment.apiHost + '/reviews/get/' +id)
  }

  edit(review: AddReviewOwner): Observable<AddReviewOwner> {
    return this.httpClient.put<AddReviewOwner>(environment.apiHost + '/reviews/editReviewOwner/'+review.id,review);
  }

  getReviewAccommodation(id: number | undefined):Observable<Review> {
    console.log(environment.apiHost + '/reviews/getAccommodation/' +id)
    return this.httpClient.get<Review>(environment.apiHost + '/reviews/getAccommodation/' +id)
  }

  editReview(review: Review) {
    console.log(review.id)
    return this.httpClient.put<AddReviewOwner>(environment.apiHost + '/reviews/editReviewAccommodation/'+review.id,review);
  }

  getRateAccommodation(idAccommodation: number, idGuest: number | undefined):Observable<Review> {
    return this.httpClient.get<Review>(environment.apiHost + '/reviews/rateAccommodation/' +idAccommodation+"/"+idGuest)
  }

  addReviewAccommodation(a: Review1): Observable<Review1> {
    console.log("SLANJE")
    console.log(a)
    return this.httpClient.post<Review1>(environment.apiHost + '/reviews/addAccRate/'+a.reservation,a)
  }

  deleteReviewAcc(id: number, idGuest: number | undefined):Observable<Review> {
    return this.httpClient.delete<Review>(environment.apiHost + '/reviews/rateAccDelete/' + id+"/"+idGuest);
  }

  getNotification(idOwner: number):Observable<NotificationVisible[]> {
    return this.httpClient.get<NotificationVisible[]>(environment.apiHost + '/notifications/notifications/' +idOwner)

  }

  addTurnOfNotification(message: MessageNotification):Observable<NotificationVisible> {
    console.log(message)
    console.log(message.idOwner)
    console.log(message.idGuest)
    return this.httpClient.post<NotificationVisible>(environment.apiHost + '/notifications/turnOfNot/' +message.idOwner+"/"+message.idGuest,message)
  }


  getAllUserReports(){
    return this.httpClient.get<ReportUserExtended[]>(environment.apiHost + '/reportUser');
  }

  deleteReport(id: number) {
    return this.httpClient.delete(environment.apiHost + "/reportUser/" + id);

  }

  update(report: Review) {
    console.log(report.status + "    report");
    return this.httpClient.put(environment.apiHost + "/reviews/"  + report.id , report);
  }

  getNotificationGuest(id: number) {
    return this.httpClient.get<NotificationVisible[]>(environment.apiHost + '/notifications/notificationsGuest/' + id)
  }
}
