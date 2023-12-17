import { NgModule } from '@angular/core';
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
import {
  EditProfileComponent
} from "./modules/profile/edit-profile/edit-profile.component";
import {
  AccommodationCreateComponent
} from "./modules/accommodations/accommodation-create/accommodation-create.component";
import {AccomodationEditComponent} from "./modules/accommodations/accomodation-edit/accomodation-edit.component";
import {OwnerHomeComponent} from "./modules/owner/owner-home/owner-home.component";
import {ActivationComponent} from "./modules/unregistered-user/signup/activation/activation.component";

import {GuestReviewsComponent} from "./modules/guest/guest-reviews/guest-reviews.component";
import {AccommodationApprovalComponent} from "./modules/administrator/accommodation-approval/accommodation-approval.component";
import {EditAccommodationComponent} from "./modules/accommodations/accommodation-edit/accommodation-edit.component";
import {AdministratorHomeComponent} from "./modules/administrator/administrator-home/administrator-home.component";

const routes: Routes = [
  {path: '', redirectTo: 'accommodations', pathMatch: 'full'},
  {component: UnregisteredUserHomeComponent, path:"accommodations"},
  {path : 'register',component:SignupComponent},
  {path : 'users/login',component:LoginComponent},
  {component:AccommodationDetailsComponent, path:"accommodations/:accommodationId"},
  {component:AccommodationDetailsComponent, path:"guests/accommodations/:accommodationId"},
  {path : 'guests',component:GuestHomeComponent},
  {path : 'edit-owner-profile', component: EditProfileComponent},
  {path : 'add-accommodation', component: AccommodationCreateComponent},
  {path : 'edit-accommodation', component: AccomodationEditComponent},
  {path : 'owners/accommodations',component:OwnerHomeComponent},
  { path: 'activate', component: ActivationComponent },
  {path : 'guests/requests', component: GuestReviewsComponent},
  {path : 'guests/accommodations', component: GuestHomeComponent},
  {path : 'edit-profile', component: EditProfileComponent},
  {path: 'accommodation-approve', component: AccommodationApprovalComponent},
  {path: 'edit-accommodation/:accommodationId', component: EditAccommodationComponent},
  {path : 'admin/accommodations', component: AdministratorHomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
