import { Component } from '@angular/core';
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Router} from "@angular/router";
import {CertificateService} from "../../auth/login/service/certificate.service";
import {DomSanitizer} from "@angular/platform-browser";
import {SuperAdminService} from "../service/superadmin.service";
import {User} from "../../../models/users/user";
import {CertificateRequest} from "../../../models/certificateRequest";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  selectedExtension: string = '';
  private extension1Selected: boolean;
  constructor(private service:LoginService,private userService:UserServiceService,private router: Router,private certificateService:CertificateService,private sanitizer: DomSanitizer,private adminService:SuperAdminService) {
  }
  submit11() {

    const country = (document.getElementById('country') as HTMLInputElement).value;
    const state = (document.getElementById('state') as HTMLInputElement).value;
    const locality = (document.getElementById('locality') as HTMLInputElement).value;
    const organization = (document.getElementById('organization') as HTMLInputElement).value;
    const unit = (document.getElementById('unit') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;

    // const extension1Checkbox = (document.getElementById('extension1') as HTMLInputElement);
    // this.extension1Selected = extension1Checkbox.checked;

    console.log('Country:', country);
    console.log('State:', state);
    console.log('Locality:', locality);
    console.log('Organization:', organization);
    console.log('Unit:', unit);
    console.log('first :', firstName);
    console.log('last :', lastName);
    console.log('Email:', email);
    console.log(this.service.getUsername());

    // const checkedButtons = document.querySelectorAll('input[type="checkbox"]:checked');
    // checkedButtons.forEach(button => {
    //   console.log(button.id + ':', true);
    // });
    var newCer:CertificateRequest={
      id:3,
      firstName:firstName,
      lastName: lastName,
      email: email,
      password: "aaa",
      organization: organization,
      country: country,
      publicKeyString:"",
      publicKey:null,
      role: "OWNER",
      subjectEmail : 'popovic.sv4.2021@uns.ac.rs',
      issuerEmail:'popovicluka65@gmail.com',
      type :2
    }

    var User:any = {
      id : 5,
      firstName:firstName,
      lastName: lastName,
      email: email
    }
    this.adminService.addCertificate(newCer).subscribe({
       next: () => {
       }
    })

  }

  generateKey() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    this.adminService.generateKeyPair(email, null).subscribe({
      next: (response) => {
        // Čuvamo generisani ključ
        //this.generatedKey = response['key'];
      },
      error: (error) => {
        // Obrada grešaka ako je potrebno
      }
    });
  }
}
