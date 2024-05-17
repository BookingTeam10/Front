import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {User} from "../../models/users/user";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak:Keycloak|undefined;
  private _profile: User|undefined;
  constructor() { }

  get keycloak(){
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url:'http://localhost:9091',
        realm:'booking',
        clientId:'bsn'
      });
    }

    return this._keycloak;
  }

  get profile(): User|undefined{
    return this._profile;
  }

  async init(){
    console.log("Initializing keycloak");
    const auth = await this.keycloak?.init({
    onLoad:'login-required'
    });

    if(auth){
      console.log("User auth1");
      this._profile = (await this.keycloak?.loadUserProfile()) as User;
      //dodati
      this._profile.token = this.keycloak?.token;
      console.log(this._profile)
    }
  }

  login(){
    console.log("UDJE OVDE")
    return this.keycloak?.login();
  }

  logout(){
    return this.keycloak?.logout({
      redirectUri:'https://localhost:4200'
    });
  }
}
