import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { UnregisteredUserHomeComponent } from './unregistered-user-home/unregistered-user-home.component';
<<<<<<< HEAD
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
=======
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {LayoutModule} from "../layout/layout.module";
>>>>>>> feature/3.5-view-accommodations


@NgModule({
  declarations: [
    SignupComponent,
    UnregisteredUserHomeComponent
  ],
    imports: [
        CommonModule,
<<<<<<< HEAD
        FlexModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatRadioModule,
        ReactiveFormsModule
=======
        AccommodationsModule,
        LayoutModule
>>>>>>> feature/3.5-view-accommodations
    ],
  exports: [
    UnregisteredUserHomeComponent
  ]
})
export class UnregisteredUserModule { }
