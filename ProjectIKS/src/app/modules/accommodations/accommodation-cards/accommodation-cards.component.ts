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
      {id: 1, description: "Welcome to our stylish and spacious 2-bedroom apartment nestled in the heart of the city. This urban oasis is designed for comfort and convenience, offering a master bedroom with a queen-sized bed, a cozy second bedroom with twin beds, a fully equipped kitchen, and a modern living area. Enjoy the city skyline from your private balcony or unwind in the contemporary living space.", minPeople: 3, maxPeople: 5},
      {id: 2, description: "Escape to our charming 2-bedroom apartment with a touch of coastal elegance. Located just a short stroll from the beach, this retreat features a master bedroom with a king-sized bed, a second bedroom with a double bed, a fully equipped kitchen, and a cozy living area. Immerse yourself in the seaside atmosphere on your private patio or explore the nearby shores. ", minPeople: 3, maxPeople: 5},
      {id: 3, description: "Experience urban living at its finest in our modern chic studio suite. This thoughtfully designed space is perfect for a couple looking for a trendy and comfortable stay. Enjoy the sleek design of the open-concept living area, a plush queen-sized bed, a fully equipped kitchenette, and a stylish bathroom. ", minPeople: 3, maxPeople: 5},
      {id: 4, description: "Discover serenity in our tranquil garden hideaway suite, perfect for a couple seeking a peaceful retreat. Nestled amidst lush greenery, this one-bedroom suite features a king-sized bed, a cozy sitting area, a fully equipped kitchenette, and a private garden patio. Immerse yourself in the soothing sounds of nature while sipping your morning coffee or unwind in the evening breeze", minPeople: 3, maxPeople: 5}
    ]
    // this.service.getAll().subscribe({
    //   next: (data: Accommodation[]) => {
    //     this.accommodations= data
    //   },
    //   error: (_) => {console.log("Greska!")}
    // })
  }
}
