import {Component, Injectable} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {Login} from "../../../models/login";
import {AuthResponse} from "../../../models/auth-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private service:LoginService,private router: Router) {
  }

  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  loginClicked():void {
    const loginData={
      email:this.loginForm.value.email || "",
      password:this.loginForm.value.password || ""
    }

    this.service.login(loginData).subscribe({
      next: (response: AuthResponse) => {
        localStorage.setItem('user', response.jwt);
        this.service.setUser()
        this.router.navigate(['owner/accommodations'])
      }
    });
  }

  registerClicked() {
    console.log("REG")
  }
}
