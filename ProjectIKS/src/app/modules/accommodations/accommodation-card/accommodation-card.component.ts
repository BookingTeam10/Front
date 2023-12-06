import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  @Input()
  accommodation: Accommodation;
  constructor(private router: Router) {
  }

  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  onAccommodationClicked(): void {
    this.clicked.emit(this.accommodation);
  }

  toDetails(id: number) {
      this.router.navigate(['/accommodations', id]);
  }

}
