import {Component, OnInit} from '@angular/core';
import {Review, ReviewStatus} from "../../../models/reservation";
import {ReviewsService} from "../../review/reviews.service";
import {MessageNotification} from "../../../models/message";

@Component({
  selector: 'app-review-reports',
  styleUrls: ['./review-reports.component.css'],
  template: `
    <div class=container>
      <img src="assets/images/city.png" alt="Accommodation Image" width="100%">
      <table>
        <thead>
        <th>Report id</th>
        <th>Comment</th>
        <th>Rate</th>
        <th>Reservation ID</th>
        <th>Action</th>
        </thead>
        <tbody>
        <tr *ngFor="let report of this.reports">
            <td>{{report.id}}</td>
            <td>{{report.comment}}</td>
            <td>{{report.rate}}</td>
            <td>{{report.reservation.id}}</td>
            <td>
              <button *ngIf="report.status === ReviewStatus.REPORTED" (click)="deleteReport(report)">Delete</button>
              <button (click)="approveReport(report)">Approve</button>
            </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ReviewReportsComponent implements OnInit{

  reports: Review[];

  constructor(private reviewService: ReviewsService) {
  }

  ngOnInit() {
    this.loadReports();
  }


  loadReports() {
      this.reviewService.getAll().subscribe((reviewes) => {
          this.reports = reviewes.filter(report => report.status != ReviewStatus.ACTIVE);
      });
  }

  deleteReport(report: Review) {
      report.status = ReviewStatus.DELETED;
      this.reviewService.update(report).subscribe((response ) => {
        this.loadReports();
      });
  }

  approveReport(report: Review) {
    report.status = ReviewStatus.ACTIVE;

    let notification: MessageNotification = {
      text: "Guest " + report.reservation.guest.name + " rated your accommodation " + report.reservation.accommodation.name,
      idGuest: report.reservation.guest.id,
      idOwner: report.reservation.accommodation.owner.id,
      userRate: "GO"
    }

    if(report.reservation.accommodation.owner.rateAccommodationNotification){
    this.reviewService.addTurnOfNotification(notification).subscribe((response) => {
    });


    this.reviewService.update(report).subscribe((response) => {
        this.loadReports();
      });
  }

  }


  protected readonly ReviewStatus = ReviewStatus;
}
