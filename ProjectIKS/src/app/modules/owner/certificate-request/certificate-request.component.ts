import { Component } from '@angular/core';
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Router} from "@angular/router";
import {CertificateService} from "../../auth/login/service/certificate.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponse} from "../../../models/auth-response";
import {MessageNotification} from "../../../models/message";
import {CertificateRequest} from "../../../models/certificateRequest";
import {SuperAdminService} from "../../superadmin/service/superadmin.service";

@Component({
  selector: 'app-certificate-request',
  templateUrl: './certificate-request.component.html',
  styleUrls: ['./certificate-request.component.css']
})
export class CertificateRequestComponent {

  constructor(private service:LoginService,private userService:UserServiceService,private router: Router,private certificateService:CertificateService,private sanitizer: DomSanitizer,private adminService:SuperAdminService) {
  }
  submit() {

      const country = (document.getElementById('country') as HTMLInputElement).value;
      const state = (document.getElementById('state') as HTMLInputElement).value;
      const locality = (document.getElementById('locality') as HTMLInputElement).value;
      const organization = (document.getElementById('organization') as HTMLInputElement).value;
      const unit = (document.getElementById('unit') as HTMLInputElement).value;
      const commonName = (document.getElementById('commonName') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;

      console.log('Country:', country);
      console.log('State:', state);
      console.log('Locality:', locality);
      console.log('Organization:', organization);
      console.log('Unit:', unit);
      console.log('Common Name:', commonName);
      console.log('Email:', email);
      console.log(this.service.getUsername());
      var request:CertificateRequest={
        "id":5,
        "firstName":"Popovic",
        "lastName":"Luka",
        "email":this.service.getUsername(),
        "password":"ftn",
        "organization":organization,
        "country":country,
        "publicKey":"A",
        "role":"Owner"
      }
      this.adminService.addRequest(request).subscribe({
        next: () => {
          //console.log("AAAAA")
        }
      })

  }
}
