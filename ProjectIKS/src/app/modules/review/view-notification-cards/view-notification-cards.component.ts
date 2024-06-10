import { Component } from '@angular/core';
import {Guest} from "../../../models/users/guest";
import {Owner} from "../../../models/users/owner";
import {NotificationVisible} from "../../../models/notification";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {KeycloakService} from "../../keycloak/keycloak.service";
import {User} from "../../../models/users/user";


@Component({
  selector: 'app-view-notification-cards',
  templateUrl: './view-notification-cards.component.html',
  styleUrls: ['./view-notification-cards.component.css']
})
export class ViewNotificationCardsComponent {

  notificationVisibles: NotificationVisible[] = [];
  private owner:Owner;
  public _profile: User | undefined;

  constructor(private keyCloakService:KeycloakService,private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
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

  async loadOwner() {
    console.log("UDJE NOTIFICATION")
    this._profile = (await this.keyCloakService.keycloak?.loadUserProfile()) as User;
    // @ts-ignore
    this._profile.email = this._profile.username;
    console.log(typeof this._profile.email)
    this.loadNotification(this._profile.email)
  }

  loadNotification(username:String | undefined){
    if (username != null) {
      this.service.getNotification(username).subscribe(
        (data: NotificationVisible[]) => {
          console.log("data")
          console.log(data)
          this.notificationVisibles = data;
        });
    }
  }

  isGuestOwnerRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/owners/notifications'
  }
}
