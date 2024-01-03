import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewCardsComponent } from './review-cards/review-cards.component';
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {AccommodationsModule} from "../accommodations/accommodations.module";
import { ReviewOwnerComponent } from './review-owner/review-owner.component';
import {LayoutModule} from "../layout/layout.module";
import { ReviewOwnerCardsComponent } from './review-owner-cards/review-owner-cards.component';
import { ReviewOwnerCardComponent } from './review-owner-card/review-owner-card.component';
import { ReviewOwnerCreateComponent } from './review-owner-create/review-owner-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { ReviewOwnerDetailsComponent } from './review-owner-details/review-owner-details.component';
import {SharedModule} from "../shared/shared.module";
import { ReviewAccommodationCardsComponent } from './review-accommodation-cards/review-accommodation-cards.component';
import { ReviewAccommodationComponent } from './review-accommodation/review-accommodation.component';



@NgModule({
  declarations: [
    ReviewCardComponent,
    ReviewCardsComponent,
    ReviewOwnerComponent,
    ReviewOwnerCardsComponent,
    ReviewOwnerCardComponent,
    ReviewOwnerCreateComponent,
    ReviewOwnerDetailsComponent,
    ReviewAccommodationCardsComponent,
    ReviewAccommodationComponent
  ],
  exports: [
    ReviewCardComponent,
    ReviewCardsComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatCardModule,
    LayoutModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ReviewsModule { }
