import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {Accommodation, Amenity} from "../../../models/accommodation";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";
import {Reservation, Review,ReservationStatus } from "../../../models/reservation";
import {Guest} from "../../../models/users/guest";
import {MapService} from "../../shared/map/map.service";
import * as L from "leaflet";
import {MapComponent} from "../../shared/map/map.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
  MatDatepicker,
  MatDatepickerModule
} from '@angular/material/datepicker';
import {ReservationService} from "../../reservation/reservation.service";
import {concat, map, Observable, of, switchMap} from "rxjs";
import {ReviewsService} from "../../review/reviews.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation;
  reservation: Reservation;
  reservations : Observable<Reservation[]>;
  amenities : Observable<Amenity[]>;
  reviews$ : Observable<Review[]>;
  temp$ : Observable<Review[]>;
  review : Observable<Review>;
  typeAcc : string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  guest: Guest = {
    email: "aleksa@gmail.com",
    password: "1234",
    name: "Aleksa",
    surname: "Janjic",
    phone: "854574324",
    address: "Bulevar",
    blocked: false,
    numberCanceledReservation: 0,
    turnOnNotification: false,
    reported: false
  };
  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService,private mapService:MapService,private reservationService:ReservationService,private reviewService:ReviewsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        const id = +params['accommodationId']
        this.accommodationService.getAccommodation(id).subscribe({
          next: (data: Accommodation) => {
            this.accommodation = data
            this.mapService.setSearchAddress(this.accommodation.location.street + ", " + this.accommodation.location.number +", " + this.accommodation.location.city);
            this.amenities = this.accommodationService.getAmenityByAccommodation(this.accommodation.id);
            this.typeAcc = this.accommodation.type;
            this.reservations = this.reservationService.getByAccommodations(this.accommodation.id);
            this.reservations.subscribe(data => {
              for (let reservation of data) {
                this.reviews$ = this.reviewService.reviews$;
                console.log("KRUG");
                console.log(reservation);
                this.review = this.reviewService.getByReservations(reservation.id);
                this.reviewService.reviews$.pipe(
                  map((elements: any[]) => {
                       elements.push(this.review);
                       return elements;
                  }))
              }

            });
          }
        })

      }
    )
  }

  reserveAccommodation(accommodation: Accommodation) {
    this.reservations = this.reservationService.getAll();
    // this.reservations.subscribe(data => {
    //   for (let reservation of data) {
    //     console.log(reservation);
    //   }
    // });
    if (this.startDate == null || this.endDate == null){
      console.log("Staviti dijalog")
    }
    else {
      this.reservation = {
        totalPrice: 3000,
        status: ReservationStatus.WAITING,
        startDate: this.startDate,
        endDate: this.endDate,
        numberOfNights: this.getDaysBetweenDates(this.startDate,this.endDate),
        accommodation: null,
        guest: this.guest,
        reviews: []
      };
      this.reservationService.createReservation(this.reservation);
    }
  }

  getDaysBetweenDates(startDate: Date, endDate: Date ): number{
    if (startDate && endDate) {
      const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
      const differenceInMs = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMs / msPerDay);
    }
    return 0; // In case one or both dates are null
  }

}
