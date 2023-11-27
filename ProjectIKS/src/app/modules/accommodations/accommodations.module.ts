import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {LayoutModule} from "../layout/layout.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationCardComponent,
    AccommodationDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    HttpClientModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    LayoutModule,
    MatProgressBarModule,
    RouterLink
  ],
  exports:[
    AccommodationCardComponent,
    AccommodationCardsComponent,
  ]
})
export class AccommodationsModule { }