import {Component, OnInit} from '@angular/core';
import {Review, ReviewStatus} from "../../../models/reservation";
import {ReviewsService} from "../../review/reviews.service";

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
              <button (click)="deleteReport(report)">Delete</button>
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
          this.reports = reviewes.filter(review => review.status === ReviewStatus.REPORTED);
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
    this.reviewService.update(report).subscribe((response ) => {
      this.loadReports();
    });
  }


}
