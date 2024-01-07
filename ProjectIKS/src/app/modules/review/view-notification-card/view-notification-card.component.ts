import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Owner} from "../../../models/users/owner";
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {NotificationVisible} from "../../../models/notification";

@Component({
  selector: 'app-view-notification-card',
  templateUrl: './view-notification-card.component.html',
  styleUrls: ['./view-notification-card.component.css']
})
export class ViewNotificationCardComponent {

  @Input()
  notification: NotificationVisible;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<NotificationVisible> = new EventEmitter<NotificationVisible>();

}
