import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../../infrastructure/material/material.module";
import {RouterModule} from "@angular/router";
import { UnregisteredUserNavbarComponent } from './unregistered-user-navbar/unregistered-user-navbar.component';
import { GuestNavbarComponent } from './guest-navbar/guest-navbar.component';
import { AdministratorNavbarComponent } from './administrator-navbar/administrator-navbar.component';
import { OwnerNavbarComponent } from './owner-navbar/owner-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UnregisteredUserNavbarComponent,
    GuestNavbarComponent,
    AdministratorNavbarComponent,
    OwnerNavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports : [
    NavbarComponent
  ],
})
export class LayoutModule { }
