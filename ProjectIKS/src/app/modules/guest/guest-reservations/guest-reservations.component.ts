import {Component} from '@angular/core';
import {Reservation, ReservationStatus} from "../../../models/reservation";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {ReservationService} from "../../reservation/reservation.service";
import {Router} from "@angular/router";
import {Guest} from "../../../models/users/guest";
import {NotificationVisible} from "../../../models/notification";
import {ReviewsService} from "../../review/reviews.service";
import {MessageNotification} from "../../../models/message";

@Component({
  selector: 'app-guest-reservations',
  styleUrls: ['./guest-reservations.component.css'],
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
            <button (click)="cancelReservation(reservation.id)">Cancel</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class GuestReservationsComponent {

  reservations: Reservation[];
  guest: Guest;
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
    this.userService.getGuest(this.loginService.getUsername()).subscribe((guest: Guest) =>
    {
      this.guest = guest;
      if (guest.id != null) {
        this.loadReservations(guest.id)
      }
    })
  }

  loadReservations(id: number){
    this.reservationService.getGuestReservations(id).subscribe((reservations: Reservation[]) =>{
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.reservations = reservations.filter(reservation => {
        const reservationStartDate = new Date(reservation.startDate);

        reservationStartDate.setHours(0, 0, 0, 0);

        return reservation.status === ReservationStatus.ACCEPTED && reservationStartDate > today;
      });
    })
  }
  accommodationDetails(id: number) {
    this.router.navigate(['accommodations/' + id]);
  }


  cancelReservation(id: number) {

      let r = this.reservations.find(reservation => reservation.id === id);

      if (r != null) {
        let today = new Date();

        let startDate = r.startDate || new Date();
        let cancellationDeadline = new Date(startDate);
        cancellationDeadline.setDate(cancellationDeadline.getDate() - r.accommodation.cancelDeadline);

        today.setHours(0, 0, 0, 0);
        cancellationDeadline.setHours(0, 0, 0, 0);

        if (today < cancellationDeadline) {
          this.reservationService.cancelReservation(r.id).subscribe((response: any) =>{
            if(this.guest.id)
              this.loadReservations(this.guest.id);
          });

          // KREIRAM NOTIFICATION
          let notification: MessageNotification = {
            text: "Guest " + r.guest.name +  " cancelled reservation " + r.id,
            idGuest: r.guest.id,
            idOwner: r.accommodation.owner.id,
            userRate: "GO"
          }
          if(r.accommodation.owner.cancelledNotification) {
              this.reviewService.addTurnOfNotification(notification).subscribe((response) => {
              });
          }

          // KRAJ
          alert("Reservation cancelled")
        } else {
          alert("Cancel deadline passed!")
        }
      }
    }

}
