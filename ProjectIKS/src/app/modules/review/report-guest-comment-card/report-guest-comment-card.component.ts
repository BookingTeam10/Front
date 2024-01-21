import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {AddReviewOwner, Status} from "../../../models/reviewOwner";

@Component({
  selector: 'app-report-guest-comment-card',
  templateUrl: './report-guest-comment-card.component.html',
  styleUrls: ['./report-guest-comment-card.component.css']
})
export class ReportGuestCommentCardComponent {

  @Input()
  comment: AddReviewOwner;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<AddReviewOwner> = new EventEmitter<AddReviewOwner>();

  ReportGuestComment(id: number | undefined) {
    console.log(id)
    console.log("AAAAAAA")
    this.service.getReviewOwner(id).subscribe(
      (review: AddReviewOwner) => {
        this.editIsReported(review);
      }
    );
  }


  private editIsReported(review: AddReviewOwner) {
    console.log("review")
    console.log(review);
    if(review.isReported || review.statusReview===Status.REPORTED){
      alert("VEC REPORTOVANO")
      return
    }
    review.isReported=true;
    review.statusReview=Status.REPORTED;
    console.log(review);
    this.service.edit(review).subscribe((response: any) =>{});

    this.router.navigate(['/owners/guests/comments'])
      .then(() => {
        window.location.reload();
      });
  }
}
