import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Reservation} from "../../../models/reservation";
import {MatTableDataSource} from "@angular/material/table";
import {ReservationService} from "../../reservation/reservation.service";
import {MatPaginator} from "@angular/material/paginator";
import {Guest} from "../../../models/users/guest";
import {Owner} from "../../../models/users/owner";
import {LoginService} from "../../auth/login/service/login.service";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";

@Component({
  selector: 'app-owner-requests',
  templateUrl: './owner-requests.component.html',
  styleUrls: ['./owner-requests.component.css']
})
export class OwnerRequestsComponent implements AfterViewInit,OnInit{
  reservations: Reservation[] = [];
  owner:Owner;
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  constructor(private service: ReservationService, public loginService: LoginService, private userService: UserServiceService) {
  }

  displayedColumns: string[] = ['id','accommodation-id', 'accommodation', 'guest-name','number-canceled', 'start-end', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //ovo izmeniti da bude za ownera njegove za smestaje
  ngOnInit(): void {
    this.loadOwner();

  }

  //mora ovakva seljacka varijanta jer nece drugacije
  loadOwner() {
    this.userService.getOwner(this.loginService.getUsername()).subscribe(
      (owner: Owner) => {
        this.owner = owner;
        console.log(owner.id);
        console.log(this.owner.id);
        // this.service.getOwnersRequests(this.owner.id).subscribe({
        //   next: (data: Reservation[]) => {
        //     this.reservations = data
        //     console.log(data);
        //     this.dataSource.data = data;
        //   },
        //   error: (_) => {
        //     console.log("Greska!")
        //   }
        // });
        this.service.reservations$.subscribe({
          next: (data: Reservation[]) => {
            this.reservations = data
            console.log(data);
            this.dataSource.data = data;
          },
          error: (_) => {
            console.log("Greska!")
          }
        });
      }
    );

  }

}
