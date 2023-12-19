import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorHomeComponent } from './administrator-home/administrator-home.component';
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {LayoutModule} from "../layout/layout.module";
import {GuestHomeComponent} from "../guest/guest-home/guest-home.component";


@NgModule({
  declarations: [
    AdministratorHomeComponent,

  ],
    imports: [
        CommonModule,
        LayoutModule
    ],
  exports: [
    AdministratorHomeComponent
  ]
})
export class AdministratorModule { }
