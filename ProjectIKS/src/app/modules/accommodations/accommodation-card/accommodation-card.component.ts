import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Accommodation, Price, TypeAccommodation} from "../../../models/accommodation";
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {AccommodationService} from "../service/accommodation.service";
import {Guest} from "../../../models/users/guest";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {User} from "../../../models/users/user";
import {KeycloakService} from "../../keycloak/keycloak.service";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent implements OnInit{

  @Input()
  accommodation: Accommodation;
  guest:Guest;
  isButtonClicked = false;
  favouriteAccommodations: Accommodation[];
  prices: Price[];
  todayPrice: number;
  private _profile: User | undefined;

  constructor(private keycloakService:KeycloakService,private router: Router, public loginService: LoginService, private service:AccommodationService, private userService: UserServiceService) {
  }
  ngOnInit(): void {
      this.loadGuest();
      this.prices = this.accommodation.prices;
    for (const price of this.prices) {
      const today = new Date();
      let dateStartObj = new Date( price.startDate);
      let dateEndObj = new Date( price.endDate);
      if(dateStartObj<today && today<dateEndObj){
        this.todayPrice = price.price;
      }
    }
    }

  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  onAccommodationClicked(): void {
    this.clicked.emit(this.accommodation);
  }

  toDetails(id: number) {
      this.router.navigate(['/accommodations', id]);
  }

  openEditDialogue(id: number) {
      this.router.navigate(['/edit-accommodation', id]);
  }

  isOwnersUrl():boolean {
      return this.router.url === "/owners/my-accommodations";
  }

  isGuestsUrl() {
    return this.router.url === "/guests/rate-accommodations";
  }

  openReviewDialogue(id: number) {
    this.router.navigate(['/edit-accommodation', id]);}
  isFavouriteAccommodation():boolean {
    return this.guest.favouriteAccommodations.some(acc => acc.id === this.accommodation.id);
  }

  getButtonLabel(): string {
    return this.isButtonClicked || this.isFavouriteAccommodation() ? 'Remove Favourite' : 'Add Favourite';
  }

  editFavouriteAccommodations(event: Event,id: number) {
    event.stopPropagation();
    //this.isButtonClicked = !this.isButtonClicked;
    if(!this.isFavouriteAccommodation()){
      this.service.addFavouriteAccommodation(this.guest.id,this.accommodation).subscribe(
        (response: Guest) =>{
          this.guest=response;
        });
    }else{
      console.log("Treba remove iz favourite");
      console.log(this.accommodation.id);
      this.service.deleteFavouriteAccommodation(this.guest.id,this.accommodation.id).subscribe(
        (response: Guest) =>{
          this.guest=response;
        });
    }
    console.log(this.guest);
    console.log(this.favouriteAccommodations)
  }
  loadGuest() {
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      async (guest: Guest) => {

        this._profile = (await this.keycloakService.keycloak?.loadUserProfile()) as User;
        this.guest = this._profile as Guest;
        // console.log("GUEST ")
        // console.log(this.guest);
        this.favouriteAccommodations = guest.favouriteAccommodations;
        console.log(this.favouriteAccommodations);
      }
    );
  }

  protected readonly location = location;
  protected readonly TypeAccommodation = TypeAccommodation;
}
