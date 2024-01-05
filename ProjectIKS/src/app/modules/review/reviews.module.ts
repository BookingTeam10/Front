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
import { ReviewAccommodationCardComponent } from './review-accommodation-card/review-accommodation-card.component';
import { ReportGuestComponent } from './report-guest/report-guest.component';
import { ReportGuestCardComponent } from './report-guest-card/report-guest-card.component';
import { ReportGuestCardsComponent } from './report-guest-cards/report-guest-cards.component';
import { ReportGuestCommentComponent } from './report-guest-comment/report-guest-comment.component';
import { ReportAccommodationCommentComponent } from './report-accommodation-comment/report-accommodation-comment.component';
import { ReportGuestCommentCardComponent } from './report-guest-comment-card/report-guest-comment-card.component';
import { ReportGuestCommentCardsComponent } from './report-guest-comment-cards/report-guest-comment-cards.component';
import { ReportAccommodationCommentCardComponent } from './report-accommodation-comment-card/report-accommodation-comment-card.component';
import { ReportAccommodationCommentCardsComponent } from './report-accommodation-comment-cards/report-accommodation-comment-cards.component';
import { ReportOwnerCreateComponent } from './report-owner-create/report-owner-create.component';
import { ReportGuestCreateComponent } from './report-guest-create/report-guest-create.component';
import { ReviewAccommodationCreateComponent } from './review-accommodation-create/review-accommodation-create.component';
import { ReviewAccommodationDetailsComponent } from './review-accommodation-details/review-accommodation-details.component';



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
    ReviewAccommodationComponent,
    ReviewAccommodationCardComponent,
    ReportGuestComponent,
    ReportGuestCardComponent,
    ReportGuestCardsComponent,
    ReportGuestCommentComponent,
    ReportAccommodationCommentComponent,
    ReportGuestCommentCardComponent,
    ReportGuestCommentCardsComponent,
    ReportAccommodationCommentCardComponent,
    ReportAccommodationCommentCardsComponent,
    ReportOwnerCreateComponent,
    ReportGuestCreateComponent,
    ReviewAccommodationCreateComponent,
    ReviewAccommodationDetailsComponent
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
