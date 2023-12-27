import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../../models/reservation";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Owner} from "../../../models/users/owner";
import {ReservationService} from "../../reservation/reservation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-owner-reservation',
  styleUrls: ['./owner-reservation.component.css'],
  template: `
    <div class=container>
      <img src="assets/images/city.png" alt="Accommodation Image" width="100%">
      <table>
        <thead>
        <th>Reservation ID</th>
        <th>Reservation start date</th>
        <th>Reservation end date</th>
        <th>Room ID</th>
        <th>Room name</th>
        <th>Reservation total price</th>
        <th>Action</th>
        </thead>
        <tbody>
        <tr *ngFor="let reservation of reservations">
          <td>{{reservation.id}}</td>
          <td>{{reservation.startDate}}</td>
          <td>{{reservation.endDate}}</td>
          <td (click)="accommodationDetails(reservation.accommodation.id)">{{reservation.accommodation.id}}</td>
          <td>{{reservation.accommodation.name}}</td>
          <td>{{reservation.totalPrice}}</td>
          <td>
            <button (click)="approveReservation(reservation.id)">Approve</button>
            <button (click)="rejectReservation(reservation.id)">Reject</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OwnerReservationComponent implements OnInit{

  reservations: Reservation[];
  owner: Owner;
  constructor(private loginService: LoginService,
              private userService: UserServiceService,
              private reservationService: ReservationService,
              private router: Router) {
  }

  ngOnInit() {
      this.loadOwner();
  }

  loadOwner(){
      this.userService.getOwner(this.loginService.getUsername()).subscribe((owner: Owner) =>
      {
        this.owner = owner;
        this.loadReservations(owner.id)
      })
  }

  loadReservations(id: number){
      this.reservationService.getOwnerReservations(id).subscribe((reservations: Reservation[]) =>{
        this.reservations = reservations;
      })
  }
  accommodationDetails(id: number) {
    this.router.navigate(['accommodations/' + id]);
  }

  approveReservation(id: number) {
      this.reservationService.acceptReservation(id).subscribe(() => {
        this.loadReservations(this.owner.id);
      });
  }

  rejectReservation(id: number) {
      this.reservationService.rejectReservation(id).subscribe(() => {
        this.loadReservations(this.owner.id);
      });
  }
}
