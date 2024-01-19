import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AccommodationDetailsComponent } from './accommodation-details.component';
import { AccommodationService } from '../service/accommodation.service';
import { MapService } from '../../shared/map/map.service';
import { ReservationService } from '../../reservation/reservation.service';
import { ReviewsService } from '../../review/reviews.service';
import { LoginService } from '../../auth/login/service/login.service';
import { UserServiceService } from '../../unregistered-user/signup/user-service.service';
import { ReviewCardsComponent } from '../../review/review-cards/review-cards.component';
import { MapComponent } from '../../shared/map/map.component';
import {Accommodation, AccommodationStatus, TypeAccommodation} from 'src/app/models/accommodation';
import { By } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {of, throwError} from "rxjs";
import {TypeUser} from "../../../models/registration";
import {Reservation, ReservationStatus, Review, ReviewStatus} from "../../../models/reservation";
import {Owner} from "../../../models/users/owner";
import {Guest} from "../../../models/users/guest";
import {User} from "../../../models/users/user";
import {ReviewCardComponent} from "../../review/review-card/review-card.component";
import {ReviewsModule} from "../../review/reviews.module";
import {DebugElement} from "@angular/core";
import {RegistrationService} from "../../unregistered-user/services/registration.service";

describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockUserService:jasmine.SpyObj<UserServiceService>;
  let mockLoginService:jasmine.SpyObj<LoginService>;
  let mockAccommodationService:jasmine.SpyObj<AccommodationService>;
  let mockMapService:jasmine.SpyObj<MapService>;
  let mockReservationService:jasmine.SpyObj<ReservationService>;
  let mockReviewsService:jasmine.SpyObj<ReviewsService>;
  let reservationService:ReservationService;
  let reservationServiceSpy: jasmine.Spy;

  let mockActivatedRoute = {
    params: of({ accommodationId: '123' })
  };

  mockUserService = jasmine.createSpyObj('UserService', ['getGuest']);
  mockLoginService = jasmine.createSpyObj('LoginService', ['getUsername']);
  mockAccommodationService = jasmine.createSpyObj('AccommodationService', ['getAccommodation', 'getAmenityByAccommodation']);
  mockMapService = jasmine.createSpyObj('MapService', ['setSearchAddress']);
  mockReservationService = jasmine.createSpyObj('ReservationService', ['getByAccommodations','reservationCreateObs']);
  mockReviewsService = jasmine.createSpyObj('ReviewsService', ['getByReservations']);
  const ownerSend:Owner={
    id:1,
    name: "Luka",
    surname: "Popovic",
    email: "popovicluka65@gmail.com",
    password: "abc",
    address: "Aadwawdaw",
    phone: "06666666",
    createdNotification: true,
    rateMeNotification: true,
    cancelledNotification: true,
    rateAccommodationNotification: true
  }
  const accommodationSend:Accommodation={
    id:1,
    name:"Naziv",
    accepted:true,
    automaticActivation:true,
    description:"a",
    minPeople:1,
    maxPeople:5,
    photos:[],
    type:TypeAccommodation.Apartment,
    rating:5,
    cancelDeadline:5,
    prices:[],
    takenDates:[],
    amenities:[],
    location:{
      country: "Srbija",
      city: "Novi Sad",
      street: "Gunduliceva",
      id: 1,
      number: 21
    },
    owner:ownerSend,
    reservations:[],
    weekendPrice:0,
    holidayPrice:0,
    summerPrice:0,
    isNight:true,
    accommodationStatus:AccommodationStatus.APPROVED,
    automaticConfirmation:true
  }

  const guestSend:Guest={
    id: 1,
    email: "aleksa@gmail.com",
    password: "abc",
    name: "Aleksa",
    surname: "Janjic",
    phone: "055555555",
    address: "dwadawdaw",
    blocked: false,
    numberCanceledReservation: 2,
    turnOnNotification: false,
    reported: false,
    favouriteAccommodations : []
  }
  const reservation: Reservation = {
    id:500,
    totalPrice:3000,
    status:ReservationStatus.ACCEPTED,
    startDate:new Date(2024, 4, 25),
    endDate:new Date(2024, 4, 30),
    numberOfNights:5,
    accommodation:accommodationSend,
    guest:guestSend,
    reviews:[]
  };
  const review:Review  = {
    id:500,
    rate:1,
    comment: "1",
    status: ReviewStatus.ACTIVE,
    reservation: reservation
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent, ReviewCardsComponent, MapComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule ,
        BrowserAnimationsModule,
        ReviewsModule
      ],
      providers: [
        AccommodationService,
        MapService,
        ReservationService,
        ReviewsService,
        LoginService,
        UserServiceService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'your-id-value' }),
            },
          },
        },
        { provide: UserServiceService, useValue: mockUserService },
        { provide: LoginService, useValue: mockLoginService },
        { provide: AccommodationService, useValue: mockAccommodationService },
        { provide: MapService, useValue: mockMapService },
        { provide: ReservationService, useValue: mockReservationService },
        { provide: ReviewsService, useValue: mockReviewsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;

    mockUserService.getGuest.and.returnValue(of(guestSend));

    mockLoginService.getUsername.and.returnValue("A");

    mockAccommodationService.getAccommodation.and.returnValue(of(accommodationSend));

    mockAccommodationService.getAmenityByAccommodation.and.returnValue(of([]));

    // @ts-ignore
    mockMapService.setSearchAddress.and.returnValue(accommodationSend.location);

    mockReservationService.getByAccommodations.and.returnValue(of([]));

    mockReservationService.reservationCreateObs.and.returnValue(of(reservation));

    mockReviewsService.getByReservations.and.returnValue(of(review));

    mockReviewsService.reviews$ = of([review]);

    mockMapService.searchAddress$= of("Srbija, Novi Sad, Gundluceva, 21");

    component.accommodation = {
      id: 1,
      name: "name",
      accepted:true,
      automaticActivation:true,
      description : "string",
      minPeople : 1,
      maxPeople : 1,
      photos : [],
      type : TypeAccommodation.Room,
      rating:1,
      cancelDeadline:1,
      prices:[],
      takenDates:[],
      amenities:[],
      location:{
        id: 1,
        country : "string",
        city : "string",
        street : "string",
        number : 1
      },
      owner : {
        id:1,
        name: "string",
        surname: "string",
        email: "string",
        password: "string",
        address: "string",
        phone: "string",
        createdNotification: true,
        rateMeNotification: true,
        cancelledNotification: true,
        rateAccommodationNotification: true
      }
      ,
      reservations : [],
      weekendPrice:1,
      holidayPrice:1,
      summerPrice:1,
      isNight:true,
      accommodationStatus: AccommodationStatus.APPROVED,
      automaticConfirmation: true
    }

    reservationService=TestBed.inject(ReservationService);

    //reservationServiceSpy = spyOn(reservationService, 'reservationCreateObs').and.returnValue(reservation);

    //reservationServiceSpy = spyOn(reservationService, 'reservationCreateObs').and.returnValue(of(reservation));

    fixture.detectChanges();


  });

  afterEach(() => {
    mockReservationService.reservationCreateObs.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should set submitted to true`, () => {
    component.reserveAccommodation(accommodationSend);
    expect(component.submitted).toBeTruthy();
  });

  it(`should not call the reserveAccommodation when button disabled`,() => {
    spyOn(component, 'reserveAccommodation');
    el = fixture.debugElement.query(By.css('#reservationbtn')).nativeElement;
    el.click();
    expect(component.reserveAccommodation).toHaveBeenCalledTimes(0);
  });

  it(`invalid format for date (must be valid format)`, () => {
    component.reservationSend.controls['startDate'].setValue('AAAAAAA');
    component.reservationSend.controls['endDate'].setValue('2025-05-30');
    component.reservationSend.controls['numberGuests'].setValue('5');
    expect(component.reservationSend.valid).toBeFalsy();
  });

  it(`invalid format for date (must be valid format)`, () => {
    component.reservationSend.controls['startDate'].setValue('2025-05-29');
    component.reservationSend.controls['endDate'].setValue('AAAA');
    component.reservationSend.controls['numberGuests'].setValue('5');
    expect(component.reservationSend.valid).toBeFalsy();
  });

  it(`startDate must be after today's date`, () => {
    const today = new Date();
    jasmine.clock().install();
    jasmine.clock().mockDate(today);

    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 1);

    component.reservationSend.controls['startDate'].setValue(pastDate.toISOString().split('T')[0]);
    component.reservationSend.controls['endDate'].setValue(today.toISOString().split('T')[0]);
    component.reservationSend.controls['numberGuests'].setValue('5');

    const errors = component.reservationSend.errors || {};

    expect(errors['dateRange']).toBeTruthy();
    expect(component.reservationSend.valid).toBeFalsy();

    jasmine.clock().uninstall();
  });
  //
  it(`startDate must be before endDate`, () => {
    component.reservationSend.controls['startDate'].setValue('2025-05-29');
    component.reservationSend.controls['endDate'].setValue('2025-05-28');
    component.reservationSend.controls['numberGuests'].setValue('5');
    expect(component.reservationSend.valid).toBeFalsy();
  });

  it(`numberGuests must be over than 0`, () => {
    component.reservationSend.controls['startDate'].setValue('2025-05-29');
    component.reservationSend.controls['endDate'].setValue('2025-05-30');
    component.reservationSend.controls['numberGuests'].setValue('-5');
    expect(component.reservationSend.valid).toBeFalsy();
  });

  it(`valid`, () => {
    component.reservationSend.controls['startDate'].setValue('2025-05-29');
    component.reservationSend.controls['endDate'].setValue('2025-05-30');
    component.reservationSend.controls['numberGuests'].setValue('5');
    expect(component.reservationSend.valid).toBeTruthy();
  });

  it(`form should be valid and request is sent`, () => {
    mockReservationService.reservationCreateObs.and.returnValue(of(reservation));
    component.reservationSend.controls['startDate'].setValue('2025-05-29');
    component.reservationSend.controls['endDate'].setValue('2025-05-30');
    component.reservationSend.controls['numberGuests'].setValue('5');
    component.reserveAccommodation(accommodationSend);

    // Ovo je ispravna upotreba expect na špijunskoj metodi
    expect(mockReservationService.reservationCreateObs).toHaveBeenCalled();

    const args = mockReservationService.reservationCreateObs.calls.mostRecent().args;

    const startDate = new Date(args[0].startDate);
    const endDate = new Date(args[0].endDate);
    expect(startDate.toDateString()).toBe(new Date('2025-05-29').toDateString());
    expect(endDate.toDateString()).toBe(new Date('2025-05-30').toDateString());
  });
});
