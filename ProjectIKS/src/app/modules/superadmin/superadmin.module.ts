import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatesComponent } from './certificates/certificates.component';
import {LayoutModule} from "../layout/layout.module";
import { RequestsComponent } from './requests/requests.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    CertificatesComponent,
    RequestsComponent,

  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule
  ]
})
export class SuperadminModule { }
