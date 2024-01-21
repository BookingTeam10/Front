import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Owner} from "../../../models/users/owner";
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Accommodation} from "../../../models/accommodation";
import {Guest} from "../../../models/users/guest";
import {AddReviewOwner, ReviewOwner} from "../../../models/reviewOwner";
import {Review} from "../../../models/reservation";

@Component({
  selector: 'app-review-accommodation-card',
  templateUrl: './review-accommodation-card.component.html',
  styleUrls: ['./review-accommodation-card.component.css']
})
export class ReviewAccommodationCardComponent {

  @Input()
  accommodation: Accommodation;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  guest:Guest
  AddReview(idOwner: number) {
    console.log(idOwner);
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.addReviewComment(idOwner,guest.id);
      }
    );
  }

  private addReviewComment(idOwner: number, idGuest: number | undefined) {
    console.log(idOwner);
    console.log(idGuest);
    this.service.setOwnerAndGuest(idOwner, idGuest);
    this.service.getRateAccommodation(this.accommodation.id,idGuest).subscribe(
      (review: Review) =>{
        console.log(review);
        if(review===null){
          console.log("POST")
          this.router.navigate(['/guests/create-rate-accommodation', { idOwner: this.accommodation.id, idGuest: idGuest }]);
          return
        } else{
          alert("You have already rated the accommodation!")
        }
      });
  }

  ViewReview(idOwner: number) {
    console.log(idOwner);
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.viewReviewComment(idOwner,guest.id);
      }
    );
  }

  viewReviewComment(idOwner:number,idGuest:number | undefined){
    console.log(idOwner);
    console.log(idGuest);
    this.service.setOwnerAndGuest(idOwner, idGuest);
    this.service.getRateAccommodation(this.accommodation.id,idGuest).subscribe(
      (review: Review) =>{
        if(review===null){
          alert("You haven't rated the owner or admin haven't approve!")
        }else{
          this.router.navigate(['/guests/details-rate-accommodation', { id: review.id}]);
        }
      });
  }

  DeleteReview(id: number) {
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.deleteReviewComment(guest.id);
      }
    );
  }

  deleteReviewComment(idGuest:number | undefined){
    console.log(idGuest);
    this.service.getRateAccommodation(this.accommodation.id,idGuest).subscribe(
      (review: Review) =>{
        console.log(review);
        if(review===null){
          alert("You haven't rated the accommodation!")
        } else{
          console.log("UDJE U DELETE")

          this.service.deleteReviewAcc(this.accommodation.id,idGuest).subscribe(
            (review: Review) =>{
              console.log(review);
            });
        }
      });

  }
}
