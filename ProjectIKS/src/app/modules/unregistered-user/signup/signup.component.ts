<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../auth/login/service/login.service";
import {MatRadioChange} from "@angular/material/radio";
import {RegistrationService} from "../services/registration.service";
import {Registration} from "../../../models/registration";

=======
import { Component } from '@angular/core';
>>>>>>> feature/3.5-view-accommodations

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
<<<<<<< HEAD
export class SignupComponent implements OnInit{

  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  phoneNumberPattern = "[0-9 +]?[0-9]+[0-9 \\-]+";

  constructor(private service:RegistrationService) {
  }

  signUp = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    surname: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(this.phoneNumberPattern), Validators.minLength(6), Validators.maxLength(20), Validators.required]),
    userType: new FormControl('', [Validators.required])
  });
  registerClicked() {
    console.log("Registration");
    console.log(this.signUp.value)
    const signUpData:Registration={
      email:this.signUp.value.email || "",
      password:this.signUp.value.password || "",
      confirmPassword:this.signUp.value.confirmPassword || "",
      name:this.signUp.value.name || "",
      surname:this.signUp.value.surname || "",
      address:this.signUp.value.address || "",
      phone:this.signUp.value.phone || "",
      userType:this.signUp.value.userType
    }

    this.service.registration(signUpData).subscribe({
      next: (_) =>{
        console.log("Uspesan zahtev")
      }
    });
  }

  onUserTypeChange(event: MatRadioChange) {
    this.signUp.patchValue({ userType: event.value });
  }
  ngOnInit(): void {
  }
=======
export class SignupComponent {
>>>>>>> feature/3.5-view-accommodations

}
