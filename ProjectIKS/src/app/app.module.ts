import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UnregisteredUserModule} from "./modules/unregistered-user/unregistered-user.module";
import {LayoutModule} from "./modules/layout/layout.module";
import {AuthModule} from "./modules/auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GuestModule} from "./modules/guest/guest.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTable, MatTableModule} from "@angular/material/table";
import {OwnerModule} from "./modules/owner/owner.module";
import {SharedModule} from "./modules/shared/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReviewsModule} from "./modules/review/reviews.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UnregisteredUserModule,
    LayoutModule,
    AuthModule,
    BrowserAnimationsModule,
    GuestModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    OwnerModule,
    SharedModule,
    MatDatepickerModule,
    ReviewsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
