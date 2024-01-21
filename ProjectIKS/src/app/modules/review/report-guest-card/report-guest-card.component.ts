import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {Guest} from "../../../models/users/guest";
import {Owner} from "../../../models/users/owner";
import {ReportUser} from "../../../models/reviewOwner";

@Component({
  selector: 'app-report-guest-card',
  templateUrl: './report-guest-card.component.html',
  styleUrls: ['./report-guest-card.component.css']
})
export class ReportGuestCardComponent {

  @Input()
  guest: Guest;

  private owner:Owner;
  constructor(private router: Router, public service: ReviewsService,public loginService:LoginService,private userService: UserServiceService) {
  }

  @Output()
  clicked: EventEmitter<Guest> = new EventEmitter<Guest>();

  ReportGUest(idGuest: number | undefined) {
    console.log(idGuest);
    this.userService.getOwner(this.loginService.getUsername()).subscribe(
      (owner: Owner) => {
        this.owner = owner;
        this.addReportComment(idGuest,owner.id);
      }
    );
  }

  private addReportComment(idGuest: number | undefined, idOwner: number) {
    console.log(idOwner);
    console.log(idGuest);
    this.service.setOwnerAndGuest(idOwner, idGuest);
    this.service.getReportOG(idOwner,idGuest).subscribe(
      (reportUser: ReportUser) =>{
        console.log(reportUser);
        if(reportUser===null){
          console.log("POST")
          this.router.navigate(['/guests/create-report-guest', { idOwner: idOwner, idGuest: idGuest }]);
          return
        } else{
          alert("You have already report the guest!")
        }
      });
  }
}
