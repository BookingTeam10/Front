import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Review, Review1, ReviewStatus} from "../../../models/reservation";
import {Status} from "../../../models/reviewOwner";

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
    console.log("USLO OVDE UOPSTE")
    console.log(id)
    console.log("AAAAAAA")
    this.service.getReviewAccommodation(id).subscribe(
      (review: Review) => {
        this.editIsReported(review);
      }
    );
  }

  private editIsReported(review: Review) {
    console.log("review")
    console.log(review);
    console.log(review);
    if(review.status===ReviewStatus.REPORTED){
      alert("VEC REPORTOVANO")
      return
    }
    review.status=ReviewStatus.REPORTED
    // this.service.editReview(review).subscribe(() =>{});

    this.service.editReview(review.id).subscribe((response:Review) =>{
      console.log(response);
    });

    // this.router.navigate(['/owners/accommodation/comments'])
    //   .then(() => {
    //     window.location.reload();
    //   });
  }

}
