import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  myControl = new FormControl('');
  options: string[] = ['Ankara','Arad','Belgrade','Bucharest','Budapest','Cologne','Dresden',"Duisburg",'Durres'];
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

}
