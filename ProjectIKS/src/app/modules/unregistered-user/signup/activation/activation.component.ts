import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedDataService} from "./shared-data.service";
import {SignupComponent} from "../signup.component";
import { Location } from '@angular/common';
import {AccommodationService} from "../../../accommodations/service/accommodation.service";
import {UserServiceService} from "../user-service.service";
@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  constructor(private location: Location,private service:UserServiceService) {}
  private baseUrl = 'http://localhost:4200';

  activation=''

  ngOnInit() {
  }

  activationClicked() {
    const currentUrl = this.location.path();
    console.log('Trenutna URL adresa:', currentUrl);
    const index = currentUrl.indexOf('?code=');
    if (index !== -1) {
      const baseUrl =currentUrl.substring(0, index + '?code='.length);
      const code = currentUrl.substring(index + '?code='.length);
      this.activation=code
      console.log('activate Code', code);
    }
    this.service.activate(this.activation).subscribe({
      next: (_) =>{
        console.log("Uspesan zahtev");
      }
    });

  }
}
