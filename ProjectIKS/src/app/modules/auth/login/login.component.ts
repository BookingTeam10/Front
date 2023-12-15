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

  role: string;

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
        localStorage.setItem('User', response.jwt);
        this.service.setUser();
        console.log(response.jwt);
      }
    });

    this.service.userState.subscribe((role: string) => {
      this.role = role;
      if (this.role === 'ROLE_Administrator') {
        this.router.navigate(['/admin/accommodations']);
      } else if (this.role === 'ROLE_Owner') {
        this.router.navigate(['/owners/accommodations']);
      }else if (this.role==='ROLE_Guest'){
        this.router.navigate(['/guests/accommodations'])
      }
    });
  }


  registerClicked() {
    this.router.navigate(['/register'])
  }
}
