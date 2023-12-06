import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Registration} from "../../../models/registration";
import {Search} from "../../../models/search";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  myControl = new FormControl('');
  numberOfGuests = new FormControl(0);
  startDate: Date | null = null;
  endDate: Date | null = null;

  options: string[] = ['Belgrade','Novi Sad','Rome','Prague','Budapest','Sabac','Barcelona',"Madrid",'Istanbul'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  citiesForm = new FormGroup({
    formControl: new FormControl('', [Validators.required]),
   // startDate: new FormControl(new Date(), [Validators.required]),
   // endDate: new FormControl(new Date(), [Validators.required])
  });
  onDateRangeChange(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start') {
      this.startDate = event.value;
    } else if (type === 'end') {
      this.endDate = event.value;
    }
  }
  selectClicked() {
    const city = this.myControl.value;
    const numberOfGuests =  this.numberOfGuests.value;
    //const startDate = onDateRangeChange('start');
    //const endDate = this.citiesForm.get('endDate')?.value;
    console.log(this.startDate);
    console.log(this.endDate);
    const searchData: Search = {
      city: city || "",
      numberOfGuests: numberOfGuests || 0
    };

    console.log(searchData);
  }
}
