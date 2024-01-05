import { Component } from '@angular/core';
import {Search} from "../../../models/search";
import {Accommodation} from "../../../models/accommodation";

@Component({
  selector: 'app-owner-reports',
  templateUrl: './owner-reports.component.html',
  styleUrls: ['./owner-reports.component.css']
})
export class OwnerReportsComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectClicked() {
  }

}
