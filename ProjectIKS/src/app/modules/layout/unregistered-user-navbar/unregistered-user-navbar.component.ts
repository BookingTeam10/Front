import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-unregistered-user-navbar',
  templateUrl: './unregistered-user-navbar.component.html',
  styleUrls: ['./unregistered-user-navbar.component.css']
})
export class UnregisteredUserNavbarComponent {
  constructor(private router: Router) {
  }
  toLogin() {
    this.router.navigate(['/users/login']);
  }
  toSignup() {
    this.router.navigate(['/register']);
  }
  toHome() {
    this.router.navigate(['/accommodations']);
  }

  toEditAccount(){
    this.router.navigate(['/edit-owner-profile'])
  }
}
