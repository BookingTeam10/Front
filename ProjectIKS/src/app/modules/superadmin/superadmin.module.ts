import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatesComponent } from './certificates/certificates.component';
import {LayoutModule} from "../layout/layout.module";



@NgModule({
  declarations: [
    CertificatesComponent,

  ],
  imports: [
    CommonModule,
    LayoutModule
  ]
})
export class SuperadminModule { }
