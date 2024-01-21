import { Component } from '@angular/core';
import {Owner} from "../../../models/users/owner";
import {Guest} from "../../../models/users/guest";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Accommodation} from "../../../models/accommodation";

@Component({
  selector: 'app-review-accommodation-cards',
  templateUrl: './review-accommodation-cards.component.html',
  styleUrls: ['./review-accommodation-cards.component.css']
})
export class ReviewAccommodationCardsComponent {

  accommodations: Accommodation[] = [];
  private guest:Guest;
  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {
    if(!this.isGuestAccommodationRoute()) {
      this.service.accommodations$.subscribe({
        next: (data: Accommodation[]) => {
          this.accommodations= data
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
        this.loadAccommodation(guest);
      }
    );
  }

  loadAccommodation(guest: Guest){
    this.service.getAccommodation(guest.id).subscribe(
      (data: Accommodation[]) =>{
        console.log("data")
        console.log(data)
        this.accommodations = data;
      });
  }

  isGuestRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/guests/rate-owner'
  }

  isGuestAccommodationRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/guests/rate-accommodation'
  }

}
