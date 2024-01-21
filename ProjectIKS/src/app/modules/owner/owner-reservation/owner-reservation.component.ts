import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../../models/reservation";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Owner} from "../../../models/users/owner";
import {ReservationService} from "../../reservation/reservation.service";
import {Router} from "@angular/router";
import {MessageNotification} from "../../../models/message";
import {ReviewsService} from "../../review/reviews.service";

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
            <button (click)="approveReservation(reservation)">Approve</button>
            <button (click)="rejectReservation(reservation)">Reject</button>
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
              private router: Router,
              private reviewService: ReviewsService) {
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

  approveReservation(reservation: Reservation) {

      let notification: MessageNotification = {
        text: "Owner " + reservation.accommodation.owner.name + " accepted your reservation " + reservation.id,
        idOwner: reservation.accommodation.owner.id,
        idGuest: reservation.guest.id,
        userRate: "OG"
      }

      if(reservation.guest.turnOnNotification) {
        this.reviewService.addTurnOfNotification(notification).subscribe((response) => {
        });
      }
      this.reservationService.acceptReservation(reservation.id).subscribe(() => {
        this.loadReservations(this.owner.id);
      });
  }

  rejectReservation(reservation: Reservation) {

    let notification: MessageNotification = {
      text: "Owner " + reservation.accommodation.owner.name + " rejected your reservation " + reservation.id,
      idOwner: reservation.accommodation.owner.id,
      idGuest: reservation.guest.id,
      userRate: "OG"
    }

    if(reservation.guest.turnOnNotification) {
      this.reviewService.addTurnOfNotification(notification).subscribe((response) => {
      });
    }
      this.reservationService.rejectReservation(reservation.id).subscribe(() => {
        this.loadReservations(this.owner.id);
      });
  }
}
