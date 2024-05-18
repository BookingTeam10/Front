import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RecaptchaModule} from "ng-recaptcha";



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterLink,
    ReactiveFormsModule,
    RecaptchaModule
  ],
  exports:[
    LoginComponent,
  ]
})
export class AuthModule { }
