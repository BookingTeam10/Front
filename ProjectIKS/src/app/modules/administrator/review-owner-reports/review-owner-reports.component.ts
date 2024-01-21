import {Component} from '@angular/core';
import {ReviewOwnerExtended, Status} from "../../../models/reviewOwner";
import {ReviewsService} from "../../review/reviews.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {MessageNotification} from "../../../models/message";

@Component({
  selector: 'app-review-owner-reports',
  styleUrls: ['./review-owner-reports.component.css'],
  template: `
    <div class=container>
      <img src="assets/images/city.png" alt="Accommodation Image" width="100%">
      <table>
        <thead>
        <th>Report id</th>
        <th>Rate</th>
        <th>Comment</th>
        <th>Comment Date</th>
        <th>Owner ID</th>
        <th>Guest ID</th>
        <th>Action</th>
        </thead>
        <tbody>
        <tr *ngFor="let report of this.reports">
            <td>{{report.id}}</td>
            <td>{{report.rate}}</td>
            <td>{{report.comment}}</td>
            <td>{{report.commentDate | date:'yyyy-MM-dd'}}</td>
            <td>{{report.owner.id}}</td>
            <td>{{report.guest.id}}</td>
            <td>
              <button *ngIf="report.status === Status.REPORTED" (click)="deleteReport(report)">Delete</button>
              <button (click)="approveReport(report)">Approve</button>
            </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ReviewOwnerReportsComponent {

  reports: ReviewOwnerExtended[]

  constructor(
    private reviewService: ReviewsService,
    private userService: UserServiceService
  ) {}


  ngOnInit() {
    this.loadReports();
  }

  private loadReports() {
    this.reviewService.getAllReviewOwnerReports().subscribe((reports) =>{

      this.reports = reports.filter(report => report.status != Status.ACTIVE);
    })
  }


  deleteUserReport(id: number) {
    this.reviewService.deleteReport(id).subscribe((response) =>{
      this.loadReports();
    });

  }

  deleteReport(report: ReviewOwnerExtended) {
      report.status = Status.DELETED;

      this.reviewService.updateReviewOwner(report).subscribe((response) =>{
        this.loadReports();
      })
  }

  approveReport(report: ReviewOwnerExtended) {
    report.status = Status.ACTIVE;
    let notification: MessageNotification = {
      text: "Guest " + report.guest.name + " rated you.",
      idGuest: report.guest.id,
      idOwner: report.owner.id,
      userRate: "GO"
    }

    if(report.owner.rateMeNotification) {
      this.reviewService.addTurnOfNotification(notification).subscribe((response) => {
      });
    }


    console.log("REPORTCINA: "  + report.status);
    this.reviewService.updateReviewOwner(report).subscribe((response) => {
      this.loadReports();
    });
  }

  protected readonly Status = Status;
}
