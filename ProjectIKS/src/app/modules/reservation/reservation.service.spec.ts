//
// import { ReservationService } from './reservation.service';
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {expect} from "@angular/flex-layout/_private-utils/testing";
// import {TestBed} from "@angular/core/testing";
// import {Registration, TypeUser} from "../../models/registration";
// import {environment} from "../../environment/environment";
// import {Reservation} from "../../models/reservation";
//
// describe('ReservationService', () => {
//   let service: ReservationService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ReservationService]
//     });
//     service = TestBed.inject(ReservationService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });
//
//   afterEach(() => {
//     httpMock.verify();
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   it('should send a POST request to the server', () => {
//     const reservation: Reservation = {
//       id:500,
//       email:"matijap59@gmail.com",
//       password:"nekaSifra123",
//       firstName: "Matija",
//       lastName: "Popovic",
//       phoneNumber: "06555555",
//       address: "Bulevar oslobodjenja 33",
//       userType: TypeUser.GUEST,
//       activationCode:""
//     };
//
//     service.createReservation(reservation).subscribe();
//
//     const req = httpMock.expectOne(environment.apiHost+"/guests/reservations");
//     expect(req.request.method).toEqual('POST');
//     expect(req.request.body.startDate).toEqual(reservation.startDate);
//     expect(req.request.body.endDate).toEqual(reservation.endDate);
//     expect(req.request.body.numberOfGuests).toEqual(reservation.numberOfNights);
//     expect(req.request.body.accommodation.id).toEqual(reservation.accommodation.id);
//     req.flush({});
//   });
//
//   it('should reserve accommodation', () => {
//     const reservation: Reservation = {
//       id:500,
//       email:"matijap59@gmail.com",
//       password:"nekaSifra123",
//       firstName: "Matija",
//       lastName: "Popovic",
//       phoneNumber: "06555555",
//       address: "Bulevar oslobodjenja 33",
//       userType: TypeUser.GUEST,
//       activationCode:""
//     };
//
//     service.createReservation(reservation).subscribe(data => {
//       expect(data).toEqual(reservation);
//     });
//     const req = httpMock.expectOne(environment.apiHost+"/guests/reservations");
//     expect(req.request.method).toBe('POST');
//     req.flush(reservation);
//   });
// });
