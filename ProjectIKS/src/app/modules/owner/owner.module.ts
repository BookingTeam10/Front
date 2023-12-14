import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileOwnerComponent } from './owner-account-management/edit-profile-owner/edit-profile-owner.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({

  declarations: [
    EditProfileOwnerComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class OwnerModule { }
