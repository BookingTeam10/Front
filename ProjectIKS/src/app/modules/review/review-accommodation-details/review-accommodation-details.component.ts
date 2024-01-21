import {Component, Input} from '@angular/core';
import {AddReviewOwner} from "../../../models/reviewOwner";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {ReviewBigger, ReviewStatus} from "../../../models/reservation";

@Component({
  selector: 'app-review-accommodation-details',
  templateUrl: './review-accommodation-details.component.html',
  styleUrls: ['./review-accommodation-details.component.css']
})
export class ReviewAccommodationDetailsComponent {

  @Input()
  review: ReviewBigger;

  idReview: number;
  constructor(private route: ActivatedRoute,private router: Router, private service:ReviewsService) {
    this.route.params.subscribe(params => {
      console.log("AAA");
      console.log("Owner ID:", params['id']);
      this.idReview=params['id']
      const currentDate = new Date();
      const dateString = currentDate.toISOString().split('T')[0];
      this.service.getRateById(this.idReview).subscribe(
        (review: AddReviewOwner) =>{
          const bigger:ReviewBigger={
            id:review.id,
            rate:review.rate,
            comment:review.comment,
            status:ReviewStatus.ACTIVE,
            commentDate:dateString
          }
          this.review=bigger
        });
    });
  }

}
