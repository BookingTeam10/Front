import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Owner} from "../../../models/users/owner";
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Accommodation} from "../../../models/accommodation";
import {Guest} from "../../../models/users/guest";
import {ReviewOwner} from "../../../models/reviewOwner";

@Component({
  selector: 'app-review-accommodation-card',
  templateUrl: './review-accommodation-card.component.html',
  styleUrls: ['./review-accommodation-card.component.css']
})
export class ReviewAccommodationCardComponent {

  @Input()
  accommodation: Accommodation;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  guest:Guest
  AddReview(idOwner: number) {
    console.log(idOwner);
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        //this.addReviewComment(idOwner,guest.id);
      }
    );
  }

}
