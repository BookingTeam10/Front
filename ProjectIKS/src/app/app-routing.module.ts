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
import {OwnerHomeComponent} from "./modules/owner/owner-home/owner-home.component";
import {ActivationComponent} from "./modules/unregistered-user/signup/activation/activation.component";

import {GuestReviewsComponent} from "./modules/guest/guest-reviews/guest-reviews.component";
import {AccommodationApprovalComponent} from "./modules/administrator/accommodation-approval/accommodation-approval.component";
import {EditAccommodationComponent} from "./modules/accommodations/accommodation-edit/accommodation-edit.component";
import {AdministratorHomeComponent} from "./modules/administrator/administrator-home/administrator-home.component";
import {OwnerAccommodationsComponent} from "./modules/owner/owner-accommodations/owner-accommodations.component";
import {ReviewOwnerComponent} from "./modules/review/review-owner/review-owner.component";
import {ReviewOwnerCreateComponent} from "./modules/review/review-owner-create/review-owner-create.component";
import {ReviewOwnerDetailsComponent} from "./modules/review/review-owner-details/review-owner-details.component";
import {ReviewAccommodationComponent} from "./modules/review/review-accommodation/review-accommodation.component";
import {OwnerReservationComponent} from "./modules/owner/owner-reservation/owner-reservation.component";
import {ReportGuestComponent} from "./modules/review/report-guest/report-guest.component";
import {ReportGuestCommentComponent} from "./modules/review/report-guest-comment/report-guest-comment.component";
import {
  ReportAccommodationCommentComponent
} from "./modules/review/report-accommodation-comment/report-accommodation-comment.component";
import {ReportOwnerCreateComponent} from "./modules/review/report-owner-create/report-owner-create.component";
import {ReportGuestCreateComponent} from "./modules/review/report-guest-create/report-guest-create.component";
import {
  GuestFavouriteAccommodationsComponent
} from "./modules/guest/guest-favourite-accommodations/guest-favourite-accommodations.component";
import {OwnerReportsComponent} from "./modules/owner/owner-reports/owner-reports.component";
import {OwnerRequestsComponent} from "./modules/owner/owner-requests/owner-requests.component";
import {GuestReservationsComponent} from "./modules/guest/guest-reservations/guest-reservations.component";
import {
  ReviewAccommodationCreateComponent
} from "./modules/review/review-accommodation-create/review-accommodation-create.component";
import {
  ReviewAccommodationDetailsComponent
} from "./modules/review/review-accommodation-details/review-accommodation-details.component";
import {ViewNotificationComponent} from "./modules/review/view-notification/view-notification.component";
import {UserReportsComponent} from "./modules/administrator/user-reports/user-reports.component";
import {ReviewReportsComponent} from "./modules/administrator/review-reports/review-reports.component";
import {
  ViewNotificationGuestComponent
} from "./modules/review/notifications-guest/view-notification-guest/view-notification-guest.component";
import {ReviewOwnerReportsComponent} from "./modules/administrator/review-owner-reports/review-owner-reports.component";
import {CertificatesComponent} from "./modules/superadmin/certificates/certificates.component";
import {RequestsComponent} from "./modules/superadmin/requests/requests.component";
import {CertificateRequestComponent} from "./modules/owner/certificate-request/certificate-request.component";
import {FormComponent} from "./modules/superadmin/form/form.component";


const routes: Routes = [
  {path: '', redirectTo: 'accommodations', pathMatch: 'full'},
  {component: UnregisteredUserHomeComponent, path:"accommodations"},
  {path : 'register',component:SignupComponent},
  {path : 'users/login',component:LoginComponent},
  {component:AccommodationDetailsComponent, path:"accommodations/:accommodationId"},
  {component:AccommodationDetailsComponent, path:"guests/accommodations/:accommodationId"},
  {path : 'guests/accommodations',component:GuestHomeComponent},
  {path : 'owners/add-accommodation', component: AccommodationCreateComponent},
  {path : 'edit-accommodation/:id', component: EditAccommodationComponent},
  {path : 'owners/accommodations',component:OwnerHomeComponent},
  { path: 'activate', component: ActivationComponent },
  {path : 'guests/requests', component: GuestReviewsComponent},
  {path : 'edit-profile', component: EditProfileComponent},
  {path: 'admin/accommodation-approve', component: AccommodationApprovalComponent},
  {path: 'edit-accommodation/:accommodationId', component: EditAccommodationComponent},
  {path : 'admin/accommodations', component: AdministratorHomeComponent},
  {path: 'owners/my-accommodations', component: OwnerAccommodationsComponent},
  {path: 'owners/reservations', component: OwnerReservationComponent},
  {path: 'guests/rate-owner', component: ReviewOwnerComponent},
  {path: 'guests/create-rate-owner', component: ReviewOwnerCreateComponent},
  {path: 'guests/details-rate-owner', component: ReviewOwnerDetailsComponent},
  {path: 'guests/rate-accommodation', component: ReviewAccommodationComponent},
  {path: 'owners/guests', component: ReportGuestComponent},
  {path: 'owners/guests/comments', component: ReportGuestCommentComponent},
  {path: 'owners/accommodation/comments', component: ReportAccommodationCommentComponent},
  {path: 'guests/create-report-owner', component: ReportOwnerCreateComponent},
  {path: 'guests/create-report-guest', component: ReportGuestCreateComponent},
  {path: 'guests/favourite-accommodations', component: GuestFavouriteAccommodationsComponent},
  {path: 'owners/reports', component: OwnerReportsComponent},
  {path: 'owners/requests', component: OwnerRequestsComponent},
  {path: 'guests/reservations', component: GuestReservationsComponent},
  {path: 'guests/create-rate-accommodation', component: ReviewAccommodationCreateComponent},
  {path: 'guests/details-rate-accommodation', component: ReviewAccommodationDetailsComponent},
  {path: 'owners/notifications', component: ViewNotificationComponent},
  {path: 'admin/user-reports', component: UserReportsComponent},
  {path: 'admin/review-reports', component: ReviewReportsComponent},
  {path: 'guests/notifications', component: ViewNotificationGuestComponent},
  {path: 'admin/review-owner-reports', component: ReviewOwnerReportsComponent},
  {path: 'super-admin/home', component: CertificatesComponent},
  {path: 'super-admin/requests', component: RequestsComponent},
  {path: 'owner/certificate-requests', component:CertificateRequestComponent},
  {path: 'certificate-approve', component:FormComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
