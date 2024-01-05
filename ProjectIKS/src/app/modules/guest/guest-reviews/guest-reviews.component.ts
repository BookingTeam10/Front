import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Reservation} from "../../../models/reservation";
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {ReservationService} from "../../reservation/reservation.service";

@Component({
  selector: 'app-guest-reviews',
  templateUrl: './guest-reviews.component.html',
  styleUrls: ['./guest-reviews.component.css']
})
export class GuestReviewsComponent implements AfterViewInit,OnInit {
  reservations: Reservation[] = [];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);
  dataSourceAllReviews = new MatTableDataSource<Reservation>(this.reservations);

  constructor(private service: ReservationService) {
  }

  displayedColumns: string[] = ['id', 'numberOfNights', 'price', 'start-end', 'accommodation', 'status', 'actions'];
  displayedColumnsAllReviews: string[] = ['id', 'numberOfNights', 'price', 'start-end', 'accommodation', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.service.getRequests().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        console.log(data);
        this.dataSource.data = data;
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
    //nalepiti svoj posle
    this.service.getGuestRequests(3).subscribe({
      next: (data: Reservation[]) => {
        this.dataSourceAllReviews.data = data;
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
  }

  // @ts-ignore
  deleteRequest(element) {
    this.service.deleteReservation(element.id).subscribe({
      next: (_) => {
        this.dataSource.data = this.dataSource.data.filter(reservation => reservation.id !== element.id);
      },
      error: (_) => {
        console.log("Greska!")
      }
    });
  }
}

