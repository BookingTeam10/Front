import { Component } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";

@Component({
  selector: 'app-unregistered-user-home',
  templateUrl: './unregistered-user-home.component.html',
  styleUrls: ['./unregistered-user-home.component.css']
})
export class UnregisteredUserHomeComponent {
    accommodation : Accommodation[] = [
      {id : 1, description : "Apartment1",minPeople:3,maxPeople:5},
      {id : 2, description : "Apartment2",minPeople:3,maxPeople:5},
      {id : 3, description : "Room1",minPeople:3,maxPeople:5},
      {id : 4, description : "Room2",minPeople:3,maxPeople:5}
    ]
}
