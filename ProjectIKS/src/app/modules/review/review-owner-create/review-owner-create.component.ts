import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Accommodation, AccommodationStatus, TypeAccommodation} from "../../../models/accommodation";
import {AddReviewOwner, Status} from "../../../models/reviewOwner";
import {ReviewsService} from "../reviews.service";

@Component({
  selector: 'app-review-owner-create',
  templateUrl: './review-owner-create.component.html',
  styleUrls: ['./review-owner-create.component.css']
})
export class ReviewOwnerCreateComponent {

  idOwner: number;
  idGuest: number | undefined;
  constructor(private route: ActivatedRoute,private router: Router, private service:ReviewsService) {
    this.route.params.subscribe(params => {
      console.log("Owner ID:", params['idOwner']);
      console.log("Guest ID:", params['idGuest']);
      this.idGuest=params['idGuest']
      this.idOwner=params['idOwner']
    });
  }

  getReviewData(): AddReviewOwner | null {
    const name = this.getValueById('description');
    const confirmationType = document.getElementById("rate1") as HTMLInputElement | null;


    if (!name || !this.idGuest || !confirmationType) {
      this.wrongInput();
      return null;
    }

    function getCurrentDateFormatted(): string {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function getCurrentDate(): Date {
      return new Date();
    }

    const review:AddReviewOwner = {
      id:100,
      //rate: parseInt(String(confirmationType.checked)),
      rate:5,
      comment:name,
      commentDate:getCurrentDateFormatted(),
      statusReview:Status.ACTIVE,
      idOwner:this.idOwner,
      idGuest:this.idGuest,
      isReported:false,
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
    console.log(this.idOwner)
    console.log(this.idGuest)
    const a=this.getReviewData();
    console.log(a);
    if(a!=null){
      this.service.add(a,this.idOwner,this.idGuest).subscribe((response: any) =>{});

      this.router.navigate(['/guests/rate-owner'])
        .then(() => {
          window.location.reload();
        });
    }
  }

}
