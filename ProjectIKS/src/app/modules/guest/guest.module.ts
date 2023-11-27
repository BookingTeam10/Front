import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {
  UnregisteredUserHomeComponent
} from "../unregistered-user/unregistered-user-home/unregistered-user-home.component";
import { GuestHomeComponent } from './guest-home/guest-home.component';



@NgModule({
  declarations: [

    GuestHomeComponent
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
