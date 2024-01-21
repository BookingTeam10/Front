import { Component } from '@angular/core';
import {Guest} from "../../../models/users/guest";
import {Owner} from "../../../models/users/owner";
import {NotificationVisible} from "../../../models/notification";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";


@Component({
  selector: 'app-view-notification-cards',
  templateUrl: './view-notification-cards.component.html',
  styleUrls: ['./view-notification-cards.component.css']
})
export class ViewNotificationCardsComponent {

  notificationVisibles: NotificationVisible[] = [];
  private owner:Owner;

  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }

  ngOnInit(): void {
    if(!this.isGuestOwnerRoute()) {
      this.service.notifications$.subscribe({
        next: (data: NotificationVisible[]) => {
          this.notificationVisibles= data
        },
        error: (_) => {console.log("Greska!")}
      })
    }else{
      this.loadOwner();
    }
  }

  loadOwner() {
    this.userService.getOwner(this.loginService.getUsername()).subscribe(
      (owner: Owner) => {
        this.owner = owner;
        this.loadNotification(owner);
      }
    );
  }

  loadNotification(owner: Owner){
    console.log("UDJE OVDE")
    console.log(owner.id)
    this.service.getNotification(owner.id).subscribe(
      (data: NotificationVisible[]) =>{
        console.log("data")
        console.log(data)
        this.notificationVisibles = data;
      });
  }

  isGuestOwnerRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/owners/notifications'
  }
}
