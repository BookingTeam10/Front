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

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit {

  accommodations: Accommodation[] = [];
  clickedAccommodation: string = ''
  private owner: Owner;

  constructor(private service: AccommodationService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {

    if(!this.isOwnerRoute()) {
      this.service.accommodations$.subscribe({
        next: (data: Accommodation[]) => {
          this.accommodations = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    }else{
      this.loadOwner();
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
    console.log(this.router.url +  "   URL");
    return this.router.url === '/owners/my-accommodations'
  }
  onAccommodationClicked(accommodation: Accommodation) {
    this.clickedAccommodation = accommodation.description + " " + accommodation.id;
  }
}
