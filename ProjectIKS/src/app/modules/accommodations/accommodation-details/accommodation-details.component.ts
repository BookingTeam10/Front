import {Component, Injectable, OnInit} from '@angular/core';
import {Accommodation, AccommodationStatus, Amenity, TypeAccommodation} from "../../../models/accommodation";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";
import {Reservation, ReservationStatus, Review} from "../../../models/reservation";
import {Guest} from "../../../models/users/guest";
import {MapService} from "../../shared/map/map.service";
import {ReservationService} from "../../reservation/reservation.service";
import {map, Observable} from "rxjs";
import {ReviewsService} from "../../review/reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Owner} from "../../../models/users/owner";

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

  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService,private mapService:MapService,private reservationService:ReservationService,private reviewService:ReviewsService,public loginService:LoginService) {}

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
    const exampleOwner: Owner = {
      id: 1,
      name: "Luka",
      surname: "Popovic",
      email: "popovic.sv4.2021@uns.ac.rs",
      password: '$2a$12$uI4adYfDz9yGq1ExBaiZmODKYxEFOKBKLvYanhV1ys0JsY3STJ92i',
      address: "Adresa1",
      phone: "0655197633",
      createdNotification: false,
      rateMeNotification: true,
      cancelledNotification: false,
      rateAccommodationNotification: true,
    };

    const exampleAccommodation: Accommodation = {
      id: 1,
      name: "Cozy Apartment",
      accepted: true,
      automaticActivation: true,
      description: "A comfortable apartment with a beautiful view.",
      minPeople: 2,
      maxPeople: 4,
      photos: ["photo1.jpg", "photo2.jpg"],
      type: TypeAccommodation.Apartment,
      rating: 4.5,
      cancelDeadline: 48, // in hours
      prices: [
        { startDate: new Date("2023-01-01"), endDate: new Date("2023-12-31"), price: 100 },
      ],
      takenDates: [],
      amenities: [
        { name: "Wi-Fi" },
        { name: "Air Conditioning" },
      ],
      location: {
        id: 1,
        country: "Example Country",
        city: "Example City",
        street: "123 Main Street",
        number: 456,
      },
      owner: exampleOwner,
      reservations: [],
      weekendPrice: 120,
      holidayPrice: 150,
      summerPrice: 130,
      isNight: false,
      accommodationStatus: AccommodationStatus.APPROVED,
      automaticConfirmation: true,
    };

    this.reservation = {
      id:100,
      totalPrice: 3000,
      status: ReservationStatus.WAITING,
      startDate: this.startDate,
      endDate: this.endDate,
      numberOfNights: this.getDaysBetweenDates(this.startDate,this.endDate),
      accommodation: exampleAccommodation,
      guest: this.guest,
      reviews: []
    };
      this.reservationService.createReservation(this.reservation);
    }


  getDaysBetweenDates(startDate: Date | null, endDate: Date | null): number{
    if (startDate && endDate) {
      const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
      const differenceInMs = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMs / msPerDay);
    }
    return 0; // In case one or both dates are null
  }

}
