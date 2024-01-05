import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Guest} from "../../../models/users/guest";
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Review} from "../../../models/reservation";

@Component({
  selector: 'app-report-accommodation-comment-card',
  templateUrl: './report-accommodation-comment-card.component.html',
  styleUrls: ['./report-accommodation-comment-card.component.css']
})
export class ReportAccommodationCommentCardComponent {

  @Input()
  comment: Review;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<Review> = new EventEmitter<Review>();

  ReportAccommodationComment(id: number | undefined) {

  }

}
