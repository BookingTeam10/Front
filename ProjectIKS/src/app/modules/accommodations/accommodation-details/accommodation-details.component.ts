import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";
import {Reservation} from "../../../models/reservation";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation;
  reservation: Reservation;

  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

        const id = +params['accommodationId']
        this.accommodationService.getAccommodation(id).subscribe({
          next: (data: Accommodation) => {
            this.accommodation = data}
        })
      }
    )
  }

  reserveAccommodation(accommodation: Accommodation) {
    console.log('Dugme je pritisnuto! Izvrši rezervaciju.');
    //mora se videti ko je ulogovan i dodati kalendar koji ce se dodati, za review sve imamo i tjt samo dodati,
    // 3.10 skoro gotovo, za 3.11 skoro gotovo
    console.log(accommodation);
    //this.accommodationService.addReservation(new Reser)
  }
}
