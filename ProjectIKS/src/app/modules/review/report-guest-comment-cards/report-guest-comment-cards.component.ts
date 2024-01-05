import { Component } from '@angular/core';
import {Guest} from "../../../models/users/guest";
import {Review} from "../../../models/reservation";
import {AddReviewOwner, ReviewOwner} from "../../../models/reviewOwner";
import {Owner} from "../../../models/users/owner";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";

@Component({
  selector: 'app-report-guest-comment-cards',
  templateUrl: './report-guest-comment-cards.component.html',
  styleUrls: ['./report-guest-comment-cards.component.css']
})
export class ReportGuestCommentCardsComponent {

  comments: AddReviewOwner[] = [];
  private owner:Owner;

  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {
    if(!this.isGuestOwnerRoute()) {
      this.service.commentsGuests$.subscribe({
        next: (data: AddReviewOwner[]) => {
          this.comments= data
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
        this.getReviews(owner);
      }
    );
  }

  isGuestOwnerRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/owners/guests/comments'
  }

  private getReviews(owner: Owner) {
    this.service.getComments(owner.id).subscribe(
      (data: AddReviewOwner[]) =>{
        console.log("data")
        console.log(data)
        this.comments = data;
      });
  }
}
