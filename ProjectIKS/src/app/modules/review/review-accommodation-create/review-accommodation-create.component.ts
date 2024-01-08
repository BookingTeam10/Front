import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {Reservation, ReservationStatus, Review, Review1, ReviewStatus} from "../../../models/reservation";
import {Accommodation, TypeAccommodation} from "../../../models/accommodation";

@Component({
  selector: 'app-review-accommodation-create',
  templateUrl: './review-accommodation-create.component.html',
  styleUrls: ['./review-accommodation-create.component.css']
})
export class ReviewAccommodationCreateComponent {

  idAccommodation: number;
  idGuest: number | undefined;
  constructor(private route: ActivatedRoute,private router: Router, private service:ReviewsService) {
    this.route.params.subscribe(params => {
      console.log("Owner ID:", params['idOwner']);
      console.log("Guest ID:", params['idGuest']);
      this.idGuest=params['idGuest']
      this.idAccommodation=params['idOwner']
    });
  }

  getReviewData(): Review1 | null {
    const name = this.getValueById('description');
    const confirmationType = document.getElementById("rate1") as HTMLInputElement | null;


    if (!name || !this.idGuest || !confirmationType) {
      this.wrongInput();
      return null;
    }

    const review:Review1 = {
      id:100,
      rate:5,
      comment:name,
      status:ReviewStatus.ACTIVE,
      reservation:1
    };
    return review;
  }

  wrongInput(errorMessage: string = "Wrong entries. Please check your input values."): void {
    alert(errorMessage);
  }

  private getValueById(id: string): string | null {
    const element = document.getElementById(id) as HTMLInputElement | null;
    const value = element?.value.trim();
    if (element === null || value === "" || element === undefined || value === undefined) {
      return null;
    }
    return value;
  }

  addReview() {
    const a=this.getReviewData();
    console.log(a);
    if(a!=null){
      this.service.addReviewAccommodation(a).subscribe((response: any) =>{});

      this.router.navigate(['/guests/rate-accommodation'])
        .then(() => {
          window.location.reload();
        });
    }
  }

}
