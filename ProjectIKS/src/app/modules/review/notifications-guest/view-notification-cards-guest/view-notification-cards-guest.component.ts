import { Component } from '@angular/core';
import {NotificationVisible} from "../../../../models/notification";
import {Owner} from "../../../../models/users/owner";
import {ReviewsService} from "../../reviews.service";
import {LoginService} from "../../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../../unregistered-user/signup/user-service.service";
import {Guest} from "../../../../models/users/guest";

@Component({
  selector: 'app-view-notification-cards-guest',
  templateUrl: './view-notification-cards-guest.component.html',
  styleUrls: ['./view-notification-cards-guest.component.css']
})
export class ViewNotificationCardsGuestComponent {

  notificationVisibles: NotificationVisible[] = [];
  private guest: Guest;

  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }

  ngOnInit(): void {
    if(!this.isOwnerGuestRoute()) {
      this.service.notifications$.subscribe({
        next: (data: NotificationVisible[]) => {
          this.notificationVisibles= data
        },
        error: (_) => {console.log("Greska!")}
      })
    }else{
      this.loadGuest();
    }
  }

  loadGuest() {
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.loadNotification(guest);
      }
    );
  }

  loadNotification(guest: Guest){
    this.service.getNotificationGuest(guest.id).subscribe(
      (data: NotificationVisible[]) =>{
        this.notificationVisibles = data;
      });
  }

  isOwnerGuestRoute(): boolean{
    return this.router.url === '/guests/notifications'
  }
}
