import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { UnregisteredUserHomeComponent } from './unregistered-user-home/unregistered-user-home.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [
    SignupComponent,
    UnregisteredUserHomeComponent
  ],
    imports: [
        CommonModule,
        AccommodationsModule,
        LayoutModule
    ],
  exports: [
    UnregisteredUserHomeComponent
  ]
})
export class UnregisteredUserModule { }
