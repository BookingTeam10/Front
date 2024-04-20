import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {SuperAdminService} from "../../superadmin/service/superadmin.service";
import {CertificateRequest} from "../../../models/certificateRequest";

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent {
  constructor(private router: Router,public loginService:LoginService,public adminService:SuperAdminService) {
  }
  Logout() {
    this.loginService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('User');
        this.loginService.setUser();
        this.router.navigate(['/accommodations']);
      }
    })
  }

  addAccommodation() {
    this.router.navigate(['/owners/add-accommodation']);
  }

  viewProfile(){
    this.router.navigate(["/edit-profile"]);
  }

  myAccommodations(){
    this.router.navigate(['/owners/my-accommodations']);
  }

  home(){
    this.router.navigate(['/owners/accommodations']);
  }

  viewReservations(){
    this.router.navigate(['/owners/reservations']);
  }
  viewReports(){
    this.router.navigate(['/owners/reports']);
  }
  //izmeniti posle putanju
  viewRequests(){
    this.router.navigate(['/owners/requests']);
  }

  viewGuests(){
    this.router.navigate(['/owners/guests']);
  }

  viewCommentGuests(){
    this.router.navigate(['/owners/guests/comments']);
  }

  viewCommentAccommodation(){
    this.router.navigate(['/owners/accommodation/comments']);
  }

  viewNotification() {
    this.router.navigate(['/owners/notifications']);
  }

  requestCertificate() {
    console.log("UDJE OVDEEEE")
    var request:CertificateRequest={
      "id":5,
      "firstName":"A",
      "lastName":"A",
      "email":"a@gmail.com",
      "password":"A",
      "organization":"A",
      "country":"A",
      "publicKey":"A",
      "role":"Owner"
    }
    this.adminService.requestCertificate(request).subscribe({
      next: () => {
        console.log("AAAAA")
      }
    })
  }
}
