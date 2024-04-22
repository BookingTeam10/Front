import {Component, Input} from '@angular/core';
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  private request:any;
  constructor(private activatedRoute: ActivatedRoute,private service:LoginService,private userService:UserServiceService,private router: Router,private certificateService:CertificateService,private sanitizer: DomSanitizer,private adminService:SuperAdminService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.request = history.state.request;
      //console.log("REQUEST")
      //console.log(this.request)
    });
  }

  ngOnInit() {
    console.log(this.request);
    if (this.request) {
      const { country, state, locality, organization, unit, firstName, lastName, email } = this.request;

      (document.getElementById('country') as HTMLInputElement).value = country;
      //(document.getElementById('state') as HTMLInputElement).value = state;
      (document.getElementById('state') as HTMLInputElement).value = "Srbija";
      //(document.getElementById('locality') as HTMLInputElement).value = locality;
      (document.getElementById('locality') as HTMLInputElement).value = "Srbija";
      (document.getElementById('organization') as HTMLInputElement).value = organization;
      (document.getElementById('unit') as HTMLInputElement).value = unit;
      (document.getElementById('firstName') as HTMLInputElement).value = firstName;
      (document.getElementById('lastName') as HTMLInputElement).value = lastName;
      (document.getElementById('email') as HTMLInputElement).value = email;
    }
  }


  submit11() {
    //const checkedButtons = document.querySelectorAll('input[type="checkbox"]:checked');
    var newCer:CertificateRequest={
       id:3,
       firstName:this.request.firstName,
       lastName: this.request.lastName,
       email: this.request.email,
       password: "aaa",
       organization: this.request.organization,
       country: this.request.country,
       publicKeyString:"",
       publicKey:null,
       role: "OWNER",
       subjectEmail : 'popovic.sv4.2021@uns.ac.rs',
       issuerEmail:'popovicluka65@gmail.com',
       type :2
    }

     var User:any = {
       id : 5,
       firstName:this.request.firstName,
       lastName: this.request.lastName,
       email: this.request.email
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
