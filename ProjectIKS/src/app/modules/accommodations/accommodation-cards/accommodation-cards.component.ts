import {Component, OnInit} from '@angular/core';
import {AccommodationCardComponent} from "../accommodation-card/accommodation-card.component";
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../service/accommodation.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {LoginService} from "../../auth/login/service/login.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit {

  accommodations: Accommodation[] = [];
  clickedAccommodation: string = ''

  constructor(private service: AccommodationService,public loginService:LoginService) {
  }
  ngOnInit(): void {
    this.service.accommodations$.subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations= data
        console.log("AAAA");
        console.log("UCITA");
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onAccommodationClicked(accommodation: Accommodation) {
    this.clickedAccommodation = accommodation.description + " " + accommodation.id;
  }
}
