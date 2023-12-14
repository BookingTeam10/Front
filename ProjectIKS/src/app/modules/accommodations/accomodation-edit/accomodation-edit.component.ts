import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-accomodation-edit',
  templateUrl: './accomodation-edit.component.html',
  styleUrls: ['./accomodation-edit.component.css']
})
export class AccomodationEditComponent implements OnInit{
  selectedOption: string = 'night';
  myDataArray = [];
  dataSource = new MatTableDataSource<any>(this.myDataArray);
  displayedColumns: string[] = ['firstDate', 'endDate', 'price'];
  ngOnInit(): void {
  }

  addNewRow() {
    const newRow = { firstDate: 'Novi datum', endDate: 'Novi kraj', price: 0 };
    const data = this.dataSource.data;
    data.push(newRow);
    this.dataSource.data = data;
  }
  onUserTypeChange($event: MatRadioChange) {
    console.log('Izabrana vrednost:', this.selectedOption);
  }
}
