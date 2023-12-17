import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {Accommodation, AccommodationStatus} from "../../../models/accommodation";
import {OwnerService} from "../../owner/service/owner.service";
import {Owner} from "../../../models/users/owner";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-accommodation-approval',
  styleUrls: ['./accommodation-approval.component.css'],
  standalone: true,
  imports: [
    NgForOf
  ],
  template: `
    <div class=container>
      <img src="assets/images/city.png" alt="Accommodation Image" width="100%">
      <table>
        <thead>
        <th>Room ID</th>
        <th>Owner ID</th>
        <th>Status</th>
        <th>Action</th>
        </thead>
        <tbody>
        <tr *ngFor="let accommodation of accommodations">
            <td (click)="accommodationDetails(accommodation.id)">{{accommodation.id}}</td>
            <td>{{accommodation.owner.name}}</td>
            <td>{{accommodation.accommodationStatus}}</td>
            <td>
              <button (click)="approveAccommodation(accommodation.id)">Approve</button>
              <button (click)="rejectAccommodation(accommodation.id)">Reject</button>
            </td>
        </tr>
        </tbody>
      </table>
    </div>
  `

})
export class AccommodationApprovalComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private router: Router,
    private ownerService: OwnerService
  ) {}

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations() {
    this.accommodationService.getApprovalAccommodations().subscribe((data) =>{
      for (let i = 0; i < data.length; i++) {
          if(data[i].accommodationStatus == AccommodationStatus.CREATED || data[i].accommodationStatus == AccommodationStatus.EDITED){
            this.accommodations.push(data[i]);

          }

      }
    });
  }


  approveAccommodation(id: number) {
    this.accommodationService.approveAccommodation(id).subscribe(() => {
      this.accommodations = this.accommodations.filter(a => a.id !== id);
    });
  }

  rejectAccommodation(id: number) {

    this.accommodationService.rejectAccommodation(id).subscribe(() => {
      this.accommodations = this.accommodations.filter(a => a.id !== id);
    });
  }


  accommodationDetails(id: number) {
    this.router.navigate(['accommodations/' + id]);
  }
}
