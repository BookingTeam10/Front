import { Component } from '@angular/core';
import {Guest} from "../../../models/users/guest";
import {Owner} from "../../../models/users/owner";
import {Review} from "../../../models/reservation";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";

@Component({
  selector: 'app-report-accommodation-comment-cards',
  templateUrl: './report-accommodation-comment-cards.component.html',
  styleUrls: ['./report-accommodation-comment-cards.component.css']
})
export class ReportAccommodationCommentCardsComponent {

  accommodationsComment: Review[] = [];
  private owner:Owner;

  constructor(private service: ReviewsService,public loginService:LoginService, private router : Router, private userService: UserServiceService) {
  }
  ngOnInit(): void {
    if(!this.isGuestOwnerRoute()) {
      this.service.reviews$.subscribe({
        next: (data: Review[]) => {
          this.accommodationsComment= data
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
        this.loadAccommodationsComments(owner);
      }
    );
  }

  loadAccommodationsComments(owner: Owner){
    this.service.getAccommodationComments(owner.id).subscribe(
      (data: Review[]) =>{
        console.log("data")
        console.log(data)
        this.accommodationsComment = data;
      });
  }

  isGuestOwnerRoute(): boolean{
    console.log(this.router.url +  "   URL");
    return this.router.url === '/owners/accommodation/comments'
  }

}
