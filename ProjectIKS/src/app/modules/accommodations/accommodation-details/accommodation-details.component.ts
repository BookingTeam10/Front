import {Component, Injectable, OnInit} from '@angular/core';
import {Accommodation, AccommodationStatus, Amenity, Price, TypeAccommodation} from "../../../models/accommodation";
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
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {MessageNotification} from "../../../models/message";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {match} from "../../unregistered-user/signup/signup.component";



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
  startDate: Date;
  endDate: Date;
  favouriteAccommodations: undefined;
  guest:Guest;
  submitted = false;


  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService,private mapService:MapService,private reservationService:ReservationService,private reviewService:ReviewsService,public loginService:LoginService,private userService:UserServiceService) {}

  ngOnInit(): void {
    this.loadGuest();
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
    this.submitted = true;

    this.reservation = {
      //STAVIM NEKI ID PA MI SE PROMENI NA BEKENDU
      id:100,
      //promeniti cenu
      totalPrice: 3000,
      //stavim WAITING NA POCETKU PA AKO JE AUTOMATSKA AKTIVACIJA PROMENI SE NA BEKENDU
      status: ReservationStatus.WAITING,
      startDate: this.startDate,
      endDate: this.endDate,
      numberOfNights: this.getDaysBetweenDates(this.startDate,this.endDate),
      accommodation:this.accommodation,
      guest: this.guest,
      reviews: []
    };
    if(this.reservationSend.valid){
      // this.reservationService.createReservation(this.reservation).subscribe(
      //   (response) => {
      //     // Obrada uspešnog odgovora
      //     console.log('Rezervacija uspešno kreirana', response);
      //   },
      //   (error) => {
      //     // Obrada greške
      //     console.error('Došlo je do greške pri kreiranju rezervacije', error);
      //   }
      this.reservationService.reservationCreateObs(this.reservation);
      if(accommodation.owner.createdNotification){
        if(this.guest.id!=null){
          let message:MessageNotification={
            idOwner:this.accommodation.owner.id,
            text:"Guest "+this.guest.name+" "+this.guest.surname+" is create reservation",
            idGuest:this.guest.id,
            userRate:"GO"
          }
          this.reviewService.addTurnOfNotification(message).subscribe((response: any) =>{});
          // this.socketService.postRest(message).subscribe(res => {
          //   console.log(res);
          // })
        }
      }
    }
    else{
      console.log("NIJE VALIDNO")
    }

  }


  getDaysBetweenDates(startDate: Date | null, endDate: Date | null): number{
    if (startDate && endDate) {
      const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
      const differenceInMs = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMs / msPerDay);
    }
    return 0; // In case one or both dates are null
  }

  loadGuest() {
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
      }
    );
  }

  reservationSend = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    numberGuests: new FormControl('', [Validators.required,validateGuestsNumber()]),
  }, {validators: [validateDateRange('startDate', 'endDate')]});

}


export function validateGuestsNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value !== '' && isNaN(value)) {
      return { 'notANumber': true };
    }
    return value > 0 ? null : { 'invalidNumberGuests': true };
  };
}


export function validateDateRange(startDateControlName: string, endDateControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const startDateControl = formGroup.get(startDateControlName);
    const endDateControl = formGroup.get(endDateControlName);

    if (!startDateControl || !endDateControl) {
      return null;
    }

    if ((endDateControl.errors && !endDateControl.errors['dateRange']) || (startDateControl.errors && !startDateControl.errors['dateRange'])) {
      return null;
    }

    const startDate = new Date(startDateControl.value);
    const endDate = new Date(endDateControl.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (startDate < today || startDate >= endDate) {
      endDateControl.setErrors({ dateRange: true });
      startDateControl.setErrors({ dateRange: true });
      return { dateRange: true };
    } else {
      endDateControl.setErrors(null);
      startDateControl.setErrors(null);
      return null;
    }
  };
}
