import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent {
  constructor(private router: Router) {
  }
  toHome() {
    this.router.navigate(['/guests/accommodations']);
  }
  viewReviews() {
    //morace da se napravi ovo u iss i review service
    this.router.navigate(['/guests/requests']);
  }
  Logout() {
    this.router.navigate(['/accommodations']);
  }

}
