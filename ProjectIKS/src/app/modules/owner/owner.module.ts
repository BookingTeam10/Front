import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {LayoutModule} from "../layout/layout.module";
import {
  UnregisteredUserHomeComponent
} from "../unregistered-user/unregistered-user-home/unregistered-user-home.component";
import {SignupComponent} from "../unregistered-user/signup/signup.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { OwnerAccommodationsComponent } from './owner-accommodations/owner-accommodations.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import { OwnerReservationComponent } from './owner-reservation/owner-reservation.component';

@NgModule({

  declarations: [
    EditProfileComponent,
    OwnerHomeComponent,
    OwnerAccommodationsComponent,
    OwnerReservationComponent,
  ],
  imports: [
    CommonModule,
    AccommodationsModule,
    LayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    RouterLink
  ],
  exports: [
    EditProfileComponent,
    OwnerHomeComponent,
  ]
})
export class OwnerModule { }
