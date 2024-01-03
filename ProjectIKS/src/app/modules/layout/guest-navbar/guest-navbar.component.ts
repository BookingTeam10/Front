import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent {
  constructor(private router: Router,public loginService:LoginService) {
  }
  toHome() {
    this.router.navigate(['/guests/accommodations']);
  }
  viewReviews() {
    //morace da se napravi ovo u iss i review service
    this.router.navigate(['/guests/requests']);
  }

  Logout() {
    this.loginService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('User');
        this.loginService.setUser();
        this.router.navigate(['/accommodations']);
      }
    })

  }
  EditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  RateOwner() {
    this.router.navigate(['/guests/rate-owner']);
  }

  RateAccommodation() {
    this.router.navigate(['/guests/rate-accommodation']);
  }
}
