import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation;

  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        // this.accommodation = {id : 1, description : "Apartment1",minPeople:3,maxPeople:5};
        console.log("proveraaa",this.route.snapshot.params['accommodationId']);
        let id_string: string = this.route.snapshot.params['accommodationId'];
        console.log(id_string);
        if (id_string.includes('login')) {
          this.router.navigate(['/login']);
          // Izmene ovde posle
          this.accommodation = {id : 1, description : "Apartment1",minPeople:3,maxPeople:5};
        }
        if (id_string.includes('register')) {
          this.router.navigate(['/login']);
          // Izmene ovde posle
          this.accommodation = {id : 1, description : "Apartment1",minPeople:3,maxPeople:5};
        }
        else{
          try {
            let id_number: number = +id_string;
            console.log('Konverzija uspešna:', id_number);
            this.accommodation = {id : 1, description : "Apartment1",minPeople:3,maxPeople:5};

          } catch (error) {
            console.error('Greška prilikom konverzije u broj:', error);
            this.router.navigate(['http://localhost:4200/home']);
            //this.accommodation = {id : 1, description : "Apartment1",minPeople:3,maxPeople:5};
          }
        }
      }
    )
  }


}
