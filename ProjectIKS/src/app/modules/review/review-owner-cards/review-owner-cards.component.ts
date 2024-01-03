import { Component } from '@angular/core';
import {Review} from "../../../models/reservation";
import {ReviewsService} from "../reviews.service";
import {Owner} from "../../../models/users/owner";
import {Guest} from "../../../models/users/guest";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Accommodation} from "../../../models/accommodation";

@Component({
  selector: 'app-review-owner-cards',
  templateUrl: './review-owner-cards.component.html',
  styleUrls: ['./review-owner-cards.component.css']
})
export class ReviewOwnerCardsComponent {

  owners: Owner[] = [];
  private guest:Guest;
  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {
    if(!this.isGuestRoute()) {
      this.service.owners$.subscribe({
        next: (data: Owner[]) => {
          this.owners= data
        },
        error: (_) => {console.log("Greska!")}
      })
    }else{
      this.loadGuest();
    }
  }

  loadGuest() {
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.loadGuestOwner(guest);
      }
    );
  }

  loadGuestOwner(guest: Guest){
    this.service.getGuestOwner(guest.id).subscribe(
      (data: Owner[]) =>{
        this.owners = data;
      });
  }

  isGuestRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/guests/rate-owner'
  }

}
