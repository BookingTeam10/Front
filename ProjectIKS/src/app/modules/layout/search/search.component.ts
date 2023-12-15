import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Registration} from "../../../models/registration";
import {Search} from "../../../models/search";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import { Task } from '../../../models/search';
import {AccommodationCardsComponent} from "../../accommodations/accommodation-cards/accommodation-cards.component";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  constructor(private service: AccommodationService) {
  }

  myControl = new FormControl('');
  typeAccommodationCheckbox = new FormControl('');

  numberOfGuests = new FormControl(0);
  //priceForm = new FormControl(0);
  startDate: Date | null = null;
  endDate: Date | null = null;

  options: string[] = ['Belgrade','Novi Sad','Rome','Prague','Budapest','Sabac','Barcelona',"Madrid",'Istanbul'];
  filteredOptions: Observable<string[]>;

  optionsType: string[] = ['Apartment','Room'];
  filteredType: Observable<string[]>;

  wifi: boolean = false;
  parking: boolean = false;
  airConditioning: boolean = false;
  kitchen: boolean = false;
  maximumPr: string = '';
  minimumPr: string = '';
  selectedOptionsDisplay: string[] = [];

  ngOnInit() {
    this.filteredType = this.typeAccommodationCheckbox.valueChanges.pipe(
      startWith(''),
      map(valueType => this._filterType(valueType || '')),
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterType(value: string): string[] {
    const filterValueType = value.toLowerCase();
    return this.optionsType.filter(option => option.toLowerCase().includes(filterValueType));
  }

  citiesForm = new FormGroup({
    formControl: new FormControl('', [Validators.required]),
  });
  selectClicked() {
    const city = this.myControl.value;
    const numberOfGuests =  this.numberOfGuests.value;
    const type =  this.typeAccommodationCheckbox.value;
    const searchData: Search = {
      city: city || "",
      numberOfGuests: numberOfGuests || 0,
    };
     this.selectedOptionsDisplay = this.getSelectedOptions();
    console.log(typeof this.maximumPr);
    //dodati ovde type i selectedOptions i min i max price
    // @ts-ignore
    this.service.getSearchedAccommodations(city,this.startDate,this.endDate,numberOfGuests,this.minimumPr,this.maximumPr,this.selectedOptionsDisplay).subscribe({
      next: (data: Accommodation[]) => {
        console.log(data);
        this.service.updateAccommodations(data);
      },
      error: (_) => {console.log("Greska!")}
    })
  }
  getSelectedOptions(): string[] {
    let selectedOptions: string[] = [];
    if (this.wifi) selectedOptions.push('WIFI');
    if (this.parking) selectedOptions.push('Parking');
    if (this.airConditioning) selectedOptions.push('Air-conditioning');
    if (this.kitchen) selectedOptions.push('Kitchen');
    return selectedOptions;
  }
}
