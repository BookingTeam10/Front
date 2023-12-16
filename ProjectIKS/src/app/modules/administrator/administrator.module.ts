import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorHomeComponent } from './administrator-home/administrator-home.component';
import {NavbarComponent} from "../layout/navbar/navbar.component";



@NgModule({
  declarations: [
    AdministratorHomeComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AdministratorModule { }
