import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {Accommodation} from "../../../models/accommodation";
import {AddReviewOwner, ReviewOwner} from "../../../models/reviewOwner";

@Component({
  selector: 'app-review-owner-details',
  templateUrl: './review-owner-details.component.html',
  styleUrls: ['./review-owner-details.component.css']
})
export class ReviewOwnerDetailsComponent {

  @Input()
  review: AddReviewOwner;

  idReview: number;
  constructor(private route: ActivatedRoute,private router: Router, private service:ReviewsService) {
    this.route.params.subscribe(params => {
      console.log("AAA");
      console.log("Owner ID:", params['id']);
      this.idReview=params['id']
      this.service.getRateById(this.idReview).subscribe(
        (review: AddReviewOwner) =>{
          this.review=review
        });
    });
  }


}
