import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {User} from "../../models/users/user";
import {LoginService} from "../auth/login/service/login.service";
import {Router} from "@angular/router";
import {RegistrationService} from "../unregistered-user/services/registration.service";
import {Registration, TypeUser} from "../../models/registration";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: User | undefined;

  constructor(private router: Router,private registrationService:RegistrationService) {
  }

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9091',
        realm: 'booking',
        clientId: 'bsn'
      });
    }

    return this._keycloak;
  }

  get profile(): User | undefined {
    return this._profile;
  }

  async init() {
    console.log("Initializing keycloak");
    const auth = await this.keycloak?.init({
      onLoad: 'login-required'
      //onLoad: 'check-sso'
    });

    if (auth) {
      console.log("User auth1");
      this._profile = (await this.keycloak?.loadUserProfile()) as User;
      this._profile.token = this.keycloak?.token;
      // @ts-ignore
      this._profile.email = this.keycloak?.profile.username;
      // @ts-ignore
      this._profile.role = this.keycloak?.profile?.attributes.Role;

      // @ts-ignore
      // @ts-ignore
      if (this._profile.role[0] === 'Admin')
        this.router.navigate(['/admin/accommodations']);
      // @ts-ignore
      if (this._profile.role[0] === 'Owner')
        this.router.navigate(['/owners/accommodations']);
      // @ts-ignore
      if (this._profile.role[0] === 'Guest')
        this.router.navigate(['/guests/accommodations'])

    }
  }
  login() {
    return this.keycloak?.login();
  }
  logout() {
    return this.keycloak?.logout({
      redirectUri: 'https://localhost:4200/accommodations'
    });
  }


  accountManagement(){
    return this.keycloak?.accountManagement();
  }
}
