import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {Accommodation} from "../../../models/accommodation";
import {OwnerService} from "../../owner/service/owner.service";
import {Owner} from "../../../models/users/owner";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-accommodation-approval',
  // templateUrl: './accommodation-approval.component.html',
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
            <td>{{accommodation.ownerId}}</td>
            <td>{{accommodation.status}}</td>
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
  accommodations: Accommodation[];

  constructor(
    private accommodationService: AccommodationService,
    private router: Router,
    private ownerService: OwnerService
  ) {}

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations() {
    this.accommodations = this.accommodationService.getApprovalAccommodations();
  }


  approveAccommodation(id: number) {
    console.log("approve");
  }

  rejectAccommodation(id: number) {
    console.log("reject");
  }

  generateOwnerName(ownerId: number): string {
      this.ownerService.getOwner(ownerId).subscribe(
        (owner: Owner) =>{
            console.log(owner.name);
            return owner.name;
        }
      );

      return '';
  }

  accommodationDetails(id: number) {
    console.log(id);
    this.router.navigate(['accommodations/:id']);
  }
}
