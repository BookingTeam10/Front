import {ReservationService} from './reservation.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {expect} from "@angular/flex-layout/_private-utils/testing";
import {TestBed} from "@angular/core/testing";
import {TypeUser} from "../../models/registration";
import {environment} from "../../environment/environment";
import {Reservation, ReservationStatus} from "../../models/reservation";
import {Accommodation, AccommodationStatus, TypeAccommodation} from "../../models/accommodation";
import {Guest} from "../../models/users/guest";
import {Owner} from "../../models/users/owner";

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService]
    });
    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the server', () => {
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

    service.createReservation(reservation).subscribe();

    const req = httpMock.expectOne(environment.apiHost+"/guests/reservations");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.startDate).toEqual(reservation.startDate);
    expect(req.request.body.endDate).toEqual(reservation.endDate);
    expect(req.request.body.accommodation.id).toEqual(reservation.accommodation.id);
    req.flush({});
  });

  it('should reserve accommodation', () => {
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

    service.createReservation(reservation).subscribe(data => {
      expect(data).toEqual(reservation);
    });
    const req = httpMock.expectOne(environment.apiHost+"/guests/reservations");
    expect(req.request.method).toBe('POST');
    req.flush(reservation);
  });
});
