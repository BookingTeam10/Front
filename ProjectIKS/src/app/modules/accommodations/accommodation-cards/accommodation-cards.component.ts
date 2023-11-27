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

  accommodations: Accommodation[] = [
    // {id : 1, description : "Apartment1",minPeople:3,maxPeople:5},
    // {id : 2, description : "Apartment2",minPeople:3,maxPeople:5},
    // {id : 3, description : "Room1",minPeople:3,maxPeople:5},
    // {id : 4, description : "Room2",minPeople:3,maxPeople:5}
  ];
  clickedAccommodation: string = ''

  constructor(private service: AccommodationService) {
  }
  ngOnInit(): void {
    this.accommodations = [
      {id: 1, description: "Apartment1", minPeople: 3, maxPeople: 5},
      {id: 2, description: "Apartment2", minPeople: 3, maxPeople: 5},
      {id: 3, description: "Room1", minPeople: 3, maxPeople: 5},
      {id: 4, description: "Room2", minPeople: 3, maxPeople: 5}
    ]
    // this.service.getAll().subscribe({
    //   next: (data: Accommodation[]) => {
    //     this.accommodations= data
    //   },
    //   error: (_) => {console.log("Greska!")}
    // })
  }
}
