import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {KeycloakService} from "../../keycloak/keycloak.service";

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent {
  constructor(private router: Router,public loginService:LoginService,private keycloakService:KeycloakService) {
  }
  toHome() {
    this.router.navigate(['/guests/accommodations']);
  }
  viewReviews() {
    //morace da se napravi ovo u iss i review service
    this.router.navigate(['/guests/requests']);
  }

  async Logout() {
    await this.keycloakService.logout();
  }

  GuestReservations() {
    this.router.navigate(['/guests/reservations']);
  }
  EditProfile() {
    this.keycloakService.accountManagement();
    //this.router.navigate(['/edit-profile']);
  }
  favouriteAccommodations() {
    this.router.navigate(['/guests/favourite-accommodations']);
  }

  RateOwner() {
    this.router.navigate(['/guests/rate-owner']);
  }

  RateAccommodation() {
    this.router.navigate(['/guests/rate-accommodation']);
  }

  ViewGuestNotifications() {
    this.router.navigate(['/guests/notifications']);
  }
}
