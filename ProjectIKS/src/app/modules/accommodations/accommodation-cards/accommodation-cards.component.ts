import {Component, OnInit} from '@angular/core';
import {AccommodationCardComponent} from "../accommodation-card/accommodation-card.component";
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../service/accommodation.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit {

  accommodations: Accommodation[] = [];
  clickedAccommodation: string = ''

  constructor(private service: AccommodationService) {
  }
  ngOnInit(): void {
    this.service.accommodations$.subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations= data
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onAccommodationClicked(accommodation: Accommodation) {
    this.clickedAccommodation = accommodation.description + " " + accommodation.id;
  }
}
