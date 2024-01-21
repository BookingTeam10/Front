import { Component } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {Guest} from "../../../models/users/guest";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Owner} from "../../../models/users/owner";

@Component({
  selector: 'app-report-guest-cards',
  templateUrl: './report-guest-cards.component.html',
  styleUrls: ['./report-guest-cards.component.css']
})
export class ReportGuestCardsComponent {

  guests: Guest[] = [];
  private owner:Owner;
  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {
    if(!this.isGuestOwnerRoute()) {
      this.service.guests$.subscribe({
        next: (data: Guest[]) => {
          this.guests= data
        },
        error: (_) => {console.log("Greska!")}
      })
    }else{
      this.loadOwner();
    }
  }

  loadOwner() {
    this.userService.getOwner(this.loginService.getUsername()).subscribe(
      (owner: Owner) => {
        this.owner = owner;
        this.loadGuests(owner);
      }
    );
  }

  loadGuests(owner: Owner){
    this.service.getGuests(owner.id).subscribe(
      (data: Guest[]) =>{
        console.log("data")
        console.log(data)
        this.guests = data;
      });
  }

  isGuestRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/guests/rate-owner'
  }

  isGuestOwnerRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/owners/guests'
  }

}
