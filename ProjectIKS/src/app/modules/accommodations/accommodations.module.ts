import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {HttpClientModule} from "@angular/common/http";



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
    HttpClientModule
  ],
  exports:[
    AccommodationCardComponent,
    AccommodationCardsComponent
  ]
})
export class AccommodationsModule { }
