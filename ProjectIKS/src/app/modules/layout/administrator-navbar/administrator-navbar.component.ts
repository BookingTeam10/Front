import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {KeycloakService} from "../../keycloak/keycloak.service";

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: ['./administrator-navbar.component.css']
})
export class AdministratorNavbarComponent {
  constructor(private router: Router,public loginService:LoginService,private keycloakService:KeycloakService) {
  }



  async Logout() {
    // this.loginService.logout().subscribe({
    //   next: (_) => {
    //     localStorage.removeItem('User');
    //     this.loginService.setUser();
    //     this.router.navigate(['/accommodations']);
    //   }
    // })
    await this.keycloakService.logout();
  }

  EditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  Aprove() {
    this.router.navigate(['/admin/accommodation-approve']);
  }

  UserReports() {
    this.router.navigate(['/admin/user-reports']);
  }

  ReviewReports() {
    this.router.navigate(['/admin/review-reports']);
  }

  ReviewOwnerReports() {
    this.router.navigate(['admin/review-owner-reports']);
  }
}
