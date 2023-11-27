import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import {
  UnregisteredUserHomeComponent
} from "./modules/unregistered-user/unregistered-user-home/unregistered-user-home.component";
import {SignupComponent} from "./modules/unregistered-user/signup/signup.component";
import {LoginComponent} from "./modules/auth/login/login.component";
import {GuestNavbarComponent} from "./modules/layout/guest-navbar/guest-navbar.component";
import {
  AccommodationDetailsComponent
} from "./modules/accommodations/accommodation-details/accommodation-details.component";
import {GuestHomeComponent} from "./modules/guest/guest-home/guest-home.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: UnregisteredUserHomeComponent },
  {path : 'register',component:SignupComponent},
  {path : 'login',component:LoginComponent},
  {component:AccommodationDetailsComponent, path:"home/:accommodationId"},
  {path : 'guests',component:GuestHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
