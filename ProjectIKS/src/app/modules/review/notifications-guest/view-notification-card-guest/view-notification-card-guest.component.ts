import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationVisible} from "../../../../models/notification";
import {Router} from "@angular/router";
import {ReviewsService} from "../../reviews.service";
import {LoginService} from "../../../auth/login/service/login.service";
import {UserServiceService} from "../../../unregistered-user/signup/user-service.service";

@Component({
  selector: 'app-view-notification-card-guest',
  templateUrl: './view-notification-card-guest.component.html',
  styleUrls: ['./view-notification-card-guest.component.css']
})
export class ViewNotificationCardGuestComponent {

  @Input()
  notification: NotificationVisible;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<NotificationVisible> = new EventEmitter<NotificationVisible>();
}
