import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent {
  constructor(private router: Router,public loginService:LoginService) {
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
}
