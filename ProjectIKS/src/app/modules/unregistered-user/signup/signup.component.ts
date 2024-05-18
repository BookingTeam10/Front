import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {RegistrationService} from "../services/registration.service";
import {Registration, TypeUser} from "../../../models/registration";
import {Router} from "@angular/router";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  phoneNumberPattern = "[0-9 +]?[0-9]+[0-9 \\-]+";
  selectedUserType: string;
  submitted = false;
  private captcha: string;

  constructor(private service:RegistrationService,private router: Router) {
    this.captcha = "";
  }

  signUp = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(3), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    surname: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(this.phoneNumberPattern), Validators.minLength(6), Validators.maxLength(20), Validators.required]),
    userType: new FormControl('', [Validators.required])
  }, {validators: [match('password', 'confirmPassword')]});


  resolved(captchaResponse: string | null){
    if(captchaResponse == null) captchaResponse = "";
    this.captcha = captchaResponse;
  }

  registerClicked() {
    this.submitted=true;
    const signUpData:Registration={
      id:500,
      email:this.signUp.value.email || "",
      password:this.signUp.value.password || "",
      firstName:this.signUp.value.name || "",
      lastName:this.signUp.value.surname || "",
      phoneNumber:this.signUp.value.phone || "",
      address:this.signUp.value.address || "",
      userType:TypeUser[this.selectedUserType as keyof typeof TypeUser],
      activationCode:""
    }
    if(this.signUp.valid) {
      this.verifyCaptcha(signUpData);
    }
  }

  verifyCaptcha(signUpData: Registration) {
    // Call your CAPTCHA verification API
    this.service.verifyCaptcha(this.captcha).subscribe({
      next: (verificationResponse) => {
        if (verificationResponse) {
          this.service.registerUserObs(signUpData);
        } else {
          alert('Invalid CAPTCHA. Please try again.');
        }
      },
      error: (errorResponse) => {
        console.error('CAPTCHA verification failed:', errorResponse);
      }
    });
  }

  onUserTypeChange(event: MatRadioChange) {
    this.selectedUserType = event.value;
    this.signUp.patchValue({ userType: event.value });
  }
  ngOnInit(): void {
  }

  protected readonly environment = environment;
}

export function match(controlName: string, checkControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({matching: true});
      return {matching: true};
    } else {
      return null;
    }
  };
}

