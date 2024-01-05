import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {ReservationService} from "../../reservation/reservation.service";
import {Accommodation} from "../../../models/accommodation";
import {Reservation} from "../../../models/reservation";

@Component({
  selector: 'app-filter-review',
  templateUrl: './filter-review.component.html',
  styleUrls: ['./filter-review.component.css']
})
export class FilterReviewComponent implements OnInit {
  typeAccommodationCombobox = new FormControl('');
  startDate: Date | null = null;
  endDate: Date | null = null;
  nameAccommodation:string = '';
  optionsType: string[] = ['ACCEPTED','WAITING','REJECTED'];
  filteredType: Observable<string[]>;

  constructor(private service: ReservationService) {
  }

  ngOnInit(): void {
    this.filteredType = this.typeAccommodationCombobox.valueChanges.pipe(
      startWith(''),
      map(valueType => this._filterType(valueType || '')),
    );
  }
  private _filterType(value: string): string[] {
    const filterValueType = value.toLowerCase();
    return this.optionsType.filter(option => option.toLowerCase().includes(filterValueType));
  }
  form = new FormGroup({
    formControl: new FormControl('', [Validators.required]),
  });

  selectClicked() {
    const type =  this.typeAccommodationCombobox.value;
    console.log(type);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.nameAccommodation);
    //mzd bude trebalo id ownera al nvrj
    this.service.getSearchedRequests(type,this.startDate,this.endDate,this.nameAccommodation).subscribe({
      next: (data: Reservation[]) => {
        console.log("AAAAA")
        console.log(data);

        this.service.updateReservations(data);
      },
      error: (_) => {console.log("Greska!")}
    })
  };
}
