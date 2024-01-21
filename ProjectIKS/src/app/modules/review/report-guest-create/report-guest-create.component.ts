import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewsService} from "../reviews.service";
import {ReportUser, Status} from "../../../models/reviewOwner";

@Component({
  selector: 'app-report-guest-create',
  templateUrl: './report-guest-create.component.html',
  styleUrls: ['./report-guest-create.component.css']
})
export class ReportGuestCreateComponent {

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

    if (!name || !this.idOwner) {
      this.wrongInput();
      return null;
    }

    const report:ReportUser = {
      id:100,
      comment:name,
      statusReview:Status.REPORTED,
      userReportUser:"OG"
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
