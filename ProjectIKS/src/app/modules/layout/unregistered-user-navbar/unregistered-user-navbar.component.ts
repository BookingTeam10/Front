import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "../../keycloak/keycloak.service";


@Component({
  selector: 'app-unregistered-user-navbar',
  templateUrl: './unregistered-user-navbar.component.html',
  styleUrls: ['./unregistered-user-navbar.component.css']
})
export class UnregisteredUserNavbarComponent {
  constructor(private router: Router,private keycloakService:KeycloakService) {
  }
  toLogin() {
    this.router.navigate(['/users/login']);
    //this.keycloakService.init();
    //this.keycloakService.login();
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
