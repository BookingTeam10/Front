import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {
  UnregisteredUserHomeComponent
} from "../unregistered-user/unregistered-user-home/unregistered-user-home.component";
import { GuestHomeComponent } from './guest-home/guest-home.component';
import { GuestReviewsComponent } from './guest-reviews/guest-reviews.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    GuestHomeComponent,
    GuestReviewsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    AccommodationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],

  exports: [
    GuestHomeComponent
  ]
})
export class GuestModule { }
