import {Component, OnInit} from '@angular/core';
import {AccommodationCardComponent} from "../accommodation-card/accommodation-card.component";
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../service/accommodation.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {Owner} from "../../../models/users/owner";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Guest} from "../../../models/users/guest";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit {

  accommodations: Accommodation[] = [];
  clickedAccommodation: string = ''
  private owner: Owner;
  public guest:Guest;

  constructor(private service: AccommodationService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {
    console.log("URL");
    console.log(this.router.url);
    if(!this.isOwnerRoute()) {
      this.service.accommodations$.subscribe({
        next: (data: Accommodation[]) => {

        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    }
  else{
      this.loadOwner();
    }
    console.log("PRE FAVOURITE");
    if(!this.isFavouriteAccommodationsRoute()) {
      this.service.accommodations$.subscribe({
        next: (data: Accommodation[]) => {
          console.log("UDJE1");
          this.accommodations = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    }
    else{
      console.log("UDJE2");
      this.loadGuest();
    }
  }

  loadOwner() {
    this.userService.getOwner(this.loginService.getUsername()).subscribe(
      (owner: Owner) => {
        this.owner = owner;
        this.loadOwnerAccommodations(owner);
      }
    );
  }
  loadOwnerAccommodations(owner: Owner){
    this.service.getOwnerAccommodations(owner.id).subscribe(
      (data: Accommodation[]) =>{
        this.accommodations = data;
      });
  }
  isOwnerRoute(): boolean{

    return this.router.url === '/owners/my-accommodations'
  }
  isFavouriteAccommodationsRoute(): boolean{
    return this.router.url === '/guests/favourite-accommodations'
  }
  loadGuest() {
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.loadGuestFavouriteAccommodations(guest);
      }
    );
  }
  loadGuestFavouriteAccommodations(guest: Guest){
    this.service.getGuestFavouriteAccommodations(guest.id).subscribe(
      (data: Accommodation[]) =>{
        this.accommodations = data;
      });
  }
  onAccommodationClicked(accommodation: Accommodation) {
    this.clickedAccommodation = accommodation.description + " " + accommodation.id;
  }
}
