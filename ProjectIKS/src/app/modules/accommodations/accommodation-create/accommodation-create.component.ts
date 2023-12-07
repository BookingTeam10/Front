import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import { MatTableDataSource } from '@angular/material/table';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Registration} from "../../../models/registration";
import {AddAccommodation} from "../../../models/addAccommodation";

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit{

  accommodation = new FormGroup({
    name: new FormControl('', [Validators.required]),
    minPeople: new FormControl('', [Validators.required]),
    maxPeople: new FormControl('', [Validators.required]),
    ammineity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    weekendPrice: new FormControl('', [Validators.required]),
    holidayPrice: new FormControl('', [Validators.required]),
    summerPrice: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    limit: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required]),
    confirmationType: new FormControl('', [Validators.required]),
    typeAcc: new FormControl('', [Validators.required]),
    firstDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  accommodationClicked() {
    console.log(this.accommodation.value)
    const accommodationData:AddAccommodation={
      name:this.accommodation.value.name || "",
      minPeople:this.accommodation.value.minPeople || "",
      maxPeople:this.accommodation.value.maxPeople || "",
      ammineity:this.accommodation.value.ammineity || "",
      price:this.accommodation.value.price || "",
      weekendPrice:this.accommodation.value.weekendPrice || "",
      holidayPrice:this.accommodation.value.holidayPrice || "",
      summerPrice:this.accommodation.value.summerPrice || "",
      country:this.accommodation.value.country || "",
      city:this.accommodation.value.city || "",
      street:this.accommodation.value.street || "",
      number:this.accommodation.value.number || "",
      limit:this.accommodation.value.limit || "",
      userType:this.accommodation.value.userType,
      ConfirmationType:this.accommodation.value.confirmationType,
      TypeAcc:this.accommodation.value.typeAcc,
      FirstDate:this.accommodation.value.firstDate,
      EndDate:this.accommodation.value.endDate,
    }
    //
    // this.service.registration(signUpData).subscribe({
    //   next: (_) =>{
    //     console.log("Uspesan zahtev")
    //   }
    // });
  }

  myDataArray = [
  ];

  displayedColumns: string[] = ['firstDate', 'endDate', 'price'];
  dataSource = new MatTableDataSource<any>(this.myDataArray);

  onUserTypeChange(event: MatRadioChange) {
    this.accommodation.patchValue({ userType: event.value });
  }

  onConfirmationTypeChange($event: MatRadioChange) {
    // this.accommodation.patchValue({ ConfirmationType: event.value });
  }

  onTypeAccChange($event: MatRadioChange) {

  }

  imageUrls: string[] = []; // Niz za čuvanje putanja slika

  onFilesSelected(event: any) {
    const files: File[] = event.target.files; // Dobijanje izabranih slika

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrls.push(e.target.result); // Dodavanje putanje slike u niz
      };
      reader.readAsDataURL(files[i]); // Čitanje slike kao URL
    }
  }

  addNewRow() {
    const newRow = { firstDate: 'Novi datum', endDate: 'Novi kraj', price: 0 }; // Prilagodite ovo vašim podacima
    const data = this.dataSource.data;
    data.push(newRow);
    this.dataSource.data = data;
  }
  ngOnInit(): void {
  }
}
