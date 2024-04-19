import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../../infrastructure/material/material.module";
import {RouterModule} from "@angular/router";
import { UnregisteredUserNavbarComponent } from './unregistered-user-navbar/unregistered-user-navbar.component';
import { GuestNavbarComponent } from './guest-navbar/guest-navbar.component';
import { AdministratorNavbarComponent } from './administrator-navbar/administrator-navbar.component';
import { OwnerNavbarComponent } from './owner-navbar/owner-navbar.component';
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { FilterReviewComponent } from './filter-review/filter-review.component';
import { SuperAdminNavbarComponent } from './super-admin-navbar/super-admin-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UnregisteredUserNavbarComponent,
    GuestNavbarComponent,
    AdministratorNavbarComponent,
    OwnerNavbarComponent,
    SearchComponent,
    FilterReviewComponent,
    SuperAdminNavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
    exports: [
        NavbarComponent,
        GuestNavbarComponent,
        SearchComponent,
        UnregisteredUserNavbarComponent,
        OwnerNavbarComponent,
        AdministratorNavbarComponent,
        FilterReviewComponent,
        SuperAdminNavbarComponent
    ],
})
export class LayoutModule { }
