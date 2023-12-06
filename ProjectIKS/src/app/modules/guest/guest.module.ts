import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {
  UnregisteredUserHomeComponent
} from "../unregistered-user/unregistered-user-home/unregistered-user-home.component";
import { GuestHomeComponent } from './guest-home/guest-home.component';
import { GuestReviewsComponent } from './guest-reviews/guest-reviews.component';



@NgModule({
  declarations: [
    GuestHomeComponent,
    GuestReviewsComponent
  ],
    imports: [
        CommonModule,
        LayoutModule
    ],

  exports: [
    GuestHomeComponent
  ]
})
export class GuestModule { }
