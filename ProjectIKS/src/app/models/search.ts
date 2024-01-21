import {ThemePalette} from "@angular/material/core";

export interface Search {
  city: string;
  numberOfGuests: number;
  // startDate : Date;
  // endDate ?: Date;

}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
