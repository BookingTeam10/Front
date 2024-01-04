import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {Owner} from "../../../models/users/owner";
import {ReviewsService} from "../reviews.service";
import {Guest} from "../../../models/users/guest";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Review} from "../../../models/reservation";
import {ReportUser, ReviewOwner} from "../../../models/reviewOwner";

@Component({
  selector: 'app-review-owner-card',
  templateUrl: './review-owner-card.component.html',
  styleUrls: ['./review-owner-card.component.css']
})
export class ReviewOwnerCardComponent {

  @Input()
  owner: Owner;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<Owner> = new EventEmitter<Owner>();

  private guest:Guest;
  AddReview(idOwner: number) {
    console.log(idOwner);
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.addReviewComment(idOwner,guest.id);
      }
    );
  }
  addReviewComment(idOwner:number,idGuest:number | undefined){
    console.log(idOwner);
    console.log(idGuest);
    this.service.setOwnerAndGuest(idOwner, idGuest);
    this.service.getRate(idOwner,idGuest).subscribe(
      (review: ReviewOwner[]) =>{
        console.log(typeof(review));
        console.log(review);
        if(review===null){
          console.log("POST")
          this.router.navigate(['/guests/create-rate-owner', { idOwner: idOwner, idGuest: idGuest }]);
          return
        }
        if(review.length===0){
          console.log("POST")
        }else{
          alert("You have already rated the owner!")
        }
      });

    // this.router.navigate(['/guests/rate-owner'])
    //   .then(() => {
    //     window.location.reload();
    //   });
  }

  DeleteReview(idOwner: number) {
    console.log(idOwner);
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.deleteReviewComment(idOwner,guest.id);
      }
    );
  }

  deleteReviewComment(idOwner:number,idGuest:number | undefined){
    console.log(idOwner);
    console.log(idGuest);
    this.service.setOwnerAndGuest(idOwner, idGuest);
    this.service.getRate(idOwner,idGuest).subscribe(
      (review: ReviewOwner[]) =>{
        console.log(typeof(review));
        console.log(review);
        if(review===null){
          alert("You haven't rated the owner!")
          // console.log("POST")
          // this.router.navigate(['/guests/create-rate-owner', { idOwner: idOwner, idGuest: idGuest }]);
          return
        }
        if(review.length===0){
          console.log("POST")
          alert("You haven't rated the owner!")
        }else{
          console.log("UDJE U DELETE")
          this.service.deleteReview(idOwner,idGuest);
        }
      });

    // this.router.navigate(['/guests/rate-owner'])
    //   .then(() => {
    //     window.location.reload();
    //   });
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
    this.service.getRateNew(idOwner,idGuest).subscribe(
      (review: ReviewOwner) =>{
        if(review===null){
          alert("You haven't rated the owner!")
        }else{
          this.router.navigate(['/guests/details-rate-owner', { id: review.id}]);
        }
      });
  }

  ReportReview(idOwner: number) {
    console.log(idOwner);
    this.userService.getGuest(this.loginService.getUsername()).subscribe(
      (guest: Guest) => {
        this.guest = guest;
        this.addReportComment(idOwner,guest.id);
      }
    );
  }

  addReportComment(idOwner:number,idGuest:number | undefined){
    console.log(idOwner);
    console.log(idGuest);
    this.service.setOwnerAndGuest(idOwner, idGuest);
    //this.router.navigate(['/guests/create-report-owner', { idOwner: idOwner, idGuest: idGuest }]);
    this.service.getReportGO(idOwner,idGuest).subscribe(
      (reportUser: ReportUser) =>{
        console.log(reportUser);
        if(reportUser===null){
          console.log("POST")
          this.router.navigate(['/guests/create-report-owner', { idOwner: idOwner, idGuest: idGuest }]);
          return
        } else{
          alert("You have already rated the owner!")
        }
      });
  }
}
