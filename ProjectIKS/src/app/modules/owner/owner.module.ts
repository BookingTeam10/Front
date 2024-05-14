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
import { OwnerReportsComponent } from './owner-reports/owner-reports.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import { OwnerRequestsComponent } from './owner-requests/owner-requests.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {NgChartsModule} from "ng2-charts";
import { CertificateRequestComponent } from './certificate-request/certificate-request.component';
import {FlexModule} from "@angular/flex-layout";

@NgModule({

  declarations: [
    EditProfileComponent,
    OwnerHomeComponent,
    OwnerAccommodationsComponent,
    OwnerReservationComponent,
    OwnerReportsComponent,
    OwnerRequestsComponent,
    CertificateRequestComponent,
  ],
    imports: [
        CommonModule,
        AccommodationsModule,
        LayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatCardModule,
        RouterLink,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatOptionModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatTableModule,
        NgChartsModule,
        ReactiveFormsModule,
        FlexModule
    ],
    exports: [
        EditProfileComponent,
        OwnerHomeComponent,
        CertificateRequestComponent,
    ]
})
export class OwnerModule { }
