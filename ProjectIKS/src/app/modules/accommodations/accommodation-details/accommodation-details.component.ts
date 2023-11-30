import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation;

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
}
