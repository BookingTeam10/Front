import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileOwnerComponent } from './owner-account-management/edit-profile-owner/edit-profile-owner.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {LayoutModule} from "../layout/layout.module";
import {
  UnregisteredUserHomeComponent
} from "../unregistered-user/unregistered-user-home/unregistered-user-home.component";
import {SignupComponent} from "../unregistered-user/signup/signup.component";



@NgModule({

  declarations: [
    EditProfileOwnerComponent,
    OwnerHomeComponent
  ],
    imports: [
        CommonModule,
        AccommodationsModule,
        LayoutModule
    ],
  exports: [
    EditProfileOwnerComponent,
    OwnerHomeComponent
  ]
})
export class OwnerModule { }
