import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { UnregisteredUserHomeComponent } from './unregistered-user-home/unregistered-user-home.component';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SignupComponent,
    UnregisteredUserHomeComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatRadioModule,
        ReactiveFormsModule
    ],
  exports: [
    UnregisteredUserHomeComponent
  ]
})
export class UnregisteredUserModule { }
