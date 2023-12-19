import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent {
  constructor(private router: Router) {
  }
  Logout() {
    this.router.navigate(['/accommodations']);
  }

  addAccommodation() {
    this.router.navigate(['/owners/add-accommodation']);
  }
}
