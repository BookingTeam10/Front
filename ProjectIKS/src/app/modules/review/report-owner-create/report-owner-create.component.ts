import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {AddReviewOwner, ReportUser, Status} from "../../../models/reviewOwner";

@Component({
  selector: 'app-report-owner-create',
  templateUrl: './report-owner-create.component.html',
  styleUrls: ['./report-owner-create.component.css']
})
export class ReportOwnerCreateComponent {

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

  getReportData(): ReportUser | null {
    const name = this.getValueById('description');

    if (!name || !this.idGuest) {
      this.wrongInput();
      return null;
    }

    const report:ReportUser = {
      id:100,
      comment:name,
      statusReview:Status.REPORTED,
      userReportUser:"GO"
    };
    return report;
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

  addReport() {
    console.log("USLO U REPORT")
    console.log(this.idOwner)
    console.log(this.idGuest)
    const a=this.getReportData();
    console.log("A REVIEW OWNER")
    console.log(a)
    if(a!=null){
      this.service.addReport(a,this.idOwner,this.idGuest).subscribe((response: any) =>{});

      this.router.navigate(['/guests/rate-owner'])
        .then(() => {
          window.location.reload();
        });
    }
  }

}
