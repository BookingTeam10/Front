import { Component } from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {Login} from "../../../models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private service:LoginService) {
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
      next: (_) =>{
        console.log("Uspesan zahtev")
      }
    });
  }

  registerClicked() {
    console.log("REG")
  }
}
