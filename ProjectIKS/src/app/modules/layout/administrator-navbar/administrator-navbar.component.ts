import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: ['./administrator-navbar.component.css']
})
export class AdministratorNavbarComponent {
  constructor(private router: Router) {
  }
  Logout() {
    this.router.navigate(['/accommodations']);
  }
}
