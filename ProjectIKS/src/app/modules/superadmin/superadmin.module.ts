import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatesComponent } from './certificates/certificates.component';
import {LayoutModule} from "../layout/layout.module";
import { RequestsComponent } from './requests/requests.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import { RequestCardComponent } from './request-card/request-card.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    CertificatesComponent,
    RequestsComponent,
    RequestCardComponent,

  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    AccommodationsModule,
    FlexModule,
    MatCardModule
  ]
})
export class SuperadminModule { }
