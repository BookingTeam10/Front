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
import {MatTable, MatTableModule} from "@angular/material/table";
import {OwnerModule} from "./modules/owner/owner.module";
import {SharedModule} from "./modules/shared/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReviewsModule} from "./modules/review/reviews.module";




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
    ReactiveFormsModule,
    MatTableModule,
    OwnerModule,
    SharedModule,
    MatDatepickerModule,
    ReviewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
