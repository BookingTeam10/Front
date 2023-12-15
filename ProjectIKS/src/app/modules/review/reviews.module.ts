import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewCardsComponent } from './review-cards/review-cards.component';
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {AccommodationsModule} from "../accommodations/accommodations.module";



@NgModule({
  declarations: [
    ReviewCardComponent,
    ReviewCardsComponent
  ],
  exports: [
    ReviewCardComponent,
    ReviewCardsComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatCardModule,
  ]
})
export class ReviewsModule { }
