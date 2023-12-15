import { Component } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {Review} from "../../../models/reservation";
import {ReviewsService} from "../reviews.service";

@Component({
  selector: 'app-review-cards',
  templateUrl: './review-cards.component.html',
  styleUrls: ['./review-cards.component.css']
})
export class ReviewCardsComponent {
  reviews: Review[] = [];
  constructor(private service: ReviewsService) {
  }
  ngOnInit(): void {
    this.service.reviews$.subscribe({
      next: (data: Review[]) => {
        this.reviews= data
      },
      error: (_) => {console.log("Greska!")}
    })
  }
}
