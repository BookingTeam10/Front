import {Component, Injectable, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {Login} from "../../../models/login";
import {AuthResponse} from "../../../models/auth-response";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {MessageNotification} from "../../../models/message";

import {environment} from "../../../environment/environment";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {HttpResponse} from "@angular/common/http";
import {CertificateService} from "./service/certificate.service";
import { DomSanitizer } from '@angular/platform-browser';
import {KeycloakService} from "../../keycloak/keycloak.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{


  role: string;
  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  private webSocket: WebSocket;
  certificates: any[];
  downloadLink: string;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  async ngOnInit(): Promise<void> {
    //this.initializeWebSocketConnection();
    //this.getCertificates();
    await this.keycloakService.init();
      await this.keycloakService.login();
  }

  constructor(private service:LoginService,private userService:UserServiceService,private router: Router,private certificateService:CertificateService,private sanitizer: DomSanitizer,private keycloakService:KeycloakService) {
  }
}
