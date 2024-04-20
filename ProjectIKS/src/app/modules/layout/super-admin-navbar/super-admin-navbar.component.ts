import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";

@Component({
  selector: 'app-super-admin-navbar',
  templateUrl: './super-admin-navbar.component.html',
  styleUrls: ['./super-admin-navbar.component.css']
})
export class SuperAdminNavbarComponent {
  constructor(private router: Router,public loginService:LoginService) {
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
  Requests() {
    this.router.navigate(['/super-admin/requests']);
  }

  home() {
    this.router.navigate(['/super-admin/home']);
  }
}
