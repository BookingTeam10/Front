import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Registration} from "../../../models/registration";
import {Search} from "../../../models/search";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  myControl = new FormControl('');
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

  citiesForm=new FormGroup({
    formControl: new FormControl('', [Validators.required])
  })

  selectClicked() {
    const searchData:Search={
      email:this.citiesForm.value.formControl || ""
    }
  }
}
