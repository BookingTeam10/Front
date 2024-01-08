import {Component, OnInit} from '@angular/core';
import {ReportUserExtended} from "../../../models/reviewOwner";
import {Router} from "@angular/router";
import {ReviewsService} from "../../review/reviews.service";
import {ReviewStatus} from "../../../models/reservation";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";

@Component({
  selector: 'app-user-reports',
  styleUrls: ['./user-reports.component.css'],
  template: `
    <div class=container>
      <img src="assets/images/city.png" alt="Accommodation Image" width="100%">
      <table>
        <thead>
        <th>Report id</th>
        <th>Reason</th>
        <th>Guest ID</th>
        <th>Owner ID</th>
        <th>Reported user</th>
        <th>Action</th>
        </thead>
        <tbody>
        <tr *ngFor="let report of this.reports">
            <td>{{report.id}}</td>
            <td>{{report.comment}}</td>
            <td>{{report.guest.id}}</td>
            <td>{{report.owner.id}}</td>
            <td>
              <ng-container *ngIf="report.userReportUser === 'OG'">Guest</ng-container>
              <ng-container *ngIf="report.userReportUser === 'GO'">Owner</ng-container>
            </td>
            <td>
              <button (click)="deleteUserReport(report.id)">Delete report</button>
              <button (click)="blockUser(report)">Block user</button>
            </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UserReportsComponent implements OnInit{

  reports: ReportUserExtended[]

  constructor(
    private reviewService: ReviewsService,
    private userService: UserServiceService
  ) {}


  ngOnInit() {
    this.loadUserReports();
  }

  private loadUserReports() {
    this.reviewService.getAllUserReports().subscribe((reports) =>{

        this.reports = reports.filter(report => report.status === ReviewStatus.REPORTED);
    })
  }


  deleteUserReport(id: number) {
        this.reviewService.deleteReport(id).subscribe((response) =>{
          this.loadUserReports();
        });

  }

  blockUser(report: ReportUserExtended) {
    if(report.userReportUser === "OG"){
      this.userService.blockUser(report.guest.id).subscribe((response) => {
        this.deleteUserReport(report.id);
      });
    }else if (report.userReportUser === "GO" ){
      this.userService.blockUser(report.owner.id).subscribe((response) => {
        this.deleteUserReport(report.id);
      });
    }

  }


}
