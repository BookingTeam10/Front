import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation;

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) {
  }

   ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']
      // this.accommodationService.getAccommodations(id).subscribe({
      //   next: (data: Accommodation) => { this.accommodation = data }
      // })
    })
  }

}
