import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UnregisteredUserModule} from "./modules/unregistered-user/unregistered-user.module";
import {LayoutModule} from "./modules/layout/layout.module";
import {AuthModule} from "./modules/auth/auth.module";
import {AccommodationsModule} from "./modules/accommodations/accommodations.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GuestModule} from "./modules/guest/guest.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UnregisteredUserModule,
    LayoutModule,
    AuthModule,
    BrowserAnimationsModule,
    AccommodationsModule,
    GuestModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
