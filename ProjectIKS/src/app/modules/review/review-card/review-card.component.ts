import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Accommodation} from "../../../models/accommodation";
import {Review} from "../../../models/reservation";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input()
  review:Review;
  constructor(private router: Router) {
  }

  @Output()
  clicked: EventEmitter<Review> = new EventEmitter<Review>();

}
