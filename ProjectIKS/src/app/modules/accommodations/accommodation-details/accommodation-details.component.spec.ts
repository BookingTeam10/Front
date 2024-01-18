// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AccommodationDetailsComponent } from './accommodation-details.component';
// import {SignupComponent} from "../../unregistered-user/signup/signup.component";
// import {DebugElement} from "@angular/core";
// import {RegistrationService} from "../../unregistered-user/services/registration.service";
// import {TypeUser} from "../../../models/registration";
// import {AccommodationService} from "../service/accommodation.service";
// import {UnregisteredUserModule} from "../../unregistered-user/unregistered-user.module";
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {HttpClientModule} from "@angular/common/http";
// import {MaterialModule} from "../../../infrastructure/material/material.module";
// import {ReactiveFormsModule} from "@angular/forms";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {AccommodationsModule} from "../accommodations.module";
// import { ActivatedRoute } from '@angular/router';
// import {Observable, of} from "rxjs";
// import {By} from "@angular/platform-browser";
// import {MatRadioChange} from "@angular/material/radio";
// import {ReservationService} from "../../reservation/reservation.service";
// import {ReservationStatus} from "../../../models/reservation";
// import {Accommodation} from "../../../models/accommodation";
//
// describe('AccommodationDetailsComponent', () => {
//   let component: AccommodationDetailsComponent;
//   let fixture: ComponentFixture<AccommodationDetailsComponent>;
//   let de: DebugElement;
//   let el: HTMLElement;
//   let reservationService: ReservationService;
//   let reservationServiceSpy: jasmine.Spy;
//   let mockActivatedRoute = { params: of({ accommodationId: '1' }) };
//
//   // const response  = {   //izmeniti posle samo i tjt
//   //   id:100,
//   //   totalPrice: 3000,
//   //   status: ReservationStatus.WAITING,
//   //   startDate: null,
//   //   endDate: null,
//   //   numberOfNights: 3,
//   //   accommodation:null,
//   //   guest: null,
//   //   reviews: []
//   // };
//
//   // const accommodation:Accommodation  = {   //izmeniti posle samo i tjt
//   //   id:100,
//   //   totalPrice: 3000,
//   //   status: ReservationStatus.WAITING,
//   //   startDate: null,
//   //   endDate: null,
//   //   numberOfNights: 3,
//   //   accommodation:null,
//   //   guest: null,
//   //   reviews: []
//   // };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AccommodationDetailsComponent],
//       imports:[
//         AccommodationsModule,HttpClientTestingModule, HttpClientModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule
//       ],
//       providers:[AccommodationDetailsComponent,AccommodationService]
//     }).compileComponents();
//
//     //reservationService=TestBed.inject(ReservationService);
//     //reservationServiceSpy = spyOn(reservationService, 'reservationCreateObs').and.returnValue(response);
//
//     fixture = TestBed.createComponent(AccommodationDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//
//     expect(component).toBeTruthy();
//   });
//
//   it(`should not call the reserveAccommodation when button disabled`,() => {
//     spyOn(component, 'reserveAccommodation');
//     el = fixture.debugElement.query(By.css('#reservationbtn')).nativeElement;
//     el.click();
//     expect(component.reserveAccommodation).toHaveBeenCalledTimes(0);
//   });
//
//   it(`invalid format for date (must be valid format)`, () => {
//     //MM/DD/YYYY
//     component.reservationSend.controls['startDate'].setValue('AAAAAAA');
//     component.reservationSend.controls['endDate'].setValue('05/30/2025');
//     component.reservationSend.controls['numberGuests'].setValue('5');
//     expect(component.reservationSend.valid).toBeFalsy();
//   });
//
//   it(`startDate must be after today date`, () => {
//     //MM/DD/YYYY
//     component.reservationSend.controls['startDate'].setValue('05/29/2023');
//     component.reservationSend.controls['endDate'].setValue('05/30/2024');
//     component.reservationSend.controls['numberGuests'].setValue('5');
//     expect(component.reservationSend.valid).toBeFalsy();
//   });
//
//   it(`startDate must be before endDate`, () => {
//     //MM/DD/YYYY
//     component.reservationSend.controls['startDate'].setValue('05/29/2025');
//     component.reservationSend.controls['endDate'].setValue('05/28/2025');
//     component.reservationSend.controls['numberGuests'].setValue('5');
//     expect(component.reservationSend.valid).toBeFalsy();
//   });
//
//   it(`numberGuests must be over than 0`, () => {
//     //MM/DD/YYYY
//     component.reservationSend.controls['startDate'].setValue('05/29/2025');
//     component.reservationSend.controls['endDate'].setValue('05/30/2025');
//     component.reservationSend.controls['numberGuests'].setValue('-5');
//     expect(component.reservationSend.valid).toBeFalsy();
//   });
//
//   it(`valid`, () => {
//     //MM/DD/YYYY
//     component.reservationSend.controls['startDate'].setValue('05/29/2025');
//     component.reservationSend.controls['endDate'].setValue('05/30/2025');
//     component.reservationSend.controls['numberGuests'].setValue('5');
//     expect(component.reservationSend.valid).toBeTruthy();
//   });
//
//   it(`form should be valid and request is sent`, () => {
//     component.reservationSend.controls['startDate'].setValue('05/29/2025');
//     component.reservationSend.controls['endDate'].setValue('05/30/2025');
//     component.reservationSend.controls['numberGuests'].setValue('5');
//     component.reserveAccommodation(accommodation);
//
//     expect(reservationServiceSpy).toHaveBeenCalled();
//
//     const value = reservationServiceSpy.calls.mostRecent().returnValue;
//     expect(value.startDate).toBe("05/29/2025");
//     expect(value.endDate).toBe("05/30/2025");
//     expect(value.numberGuests).toBe("5");
//   });
// });
