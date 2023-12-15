import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import { MatTableDataSource } from '@angular/material/table';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Registration} from "../../../models/registration";
import {AddAccommodation} from "../../../models/addAccommodation";
import {RegistrationService} from "../../unregistered-user/services/registration.service";
import {AccommodationService} from "../service/accommodation.service";
import {Accommodation, Amenity, TakenDate} from "../../../models/accommodation";


@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit{

  dateRangeForm: FormGroup;
  constructor(private service:AccommodationService) {
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required])
    });
  }

  accommodation = new FormGroup({
    name: new FormControl('', [Validators.required]),
    describe:new FormControl('', [Validators.required]),
    minPeople: new FormControl(0, [Validators.required]),
    maxPeople: new FormControl(0, [Validators.required]),
    ammineity: new FormControl('', [Validators.required]),
    rating:new FormControl(0, [Validators.required]),
    weekendPrice: new FormControl(0, [Validators.required]),
    holidayPrice: new FormControl(0, [Validators.required]),
    summerPrice: new FormControl(0, [Validators.required]),
    limit: new FormControl(0, [Validators.required]),
    UserType: new FormControl('', [Validators.required]),
    ConfirmationType: new FormControl('', [Validators.required]),
    TypeAcc: new FormControl('', [Validators.required]),
    dataSource: new FormArray([]),
    imageUrls: new FormArray([]),
    owner: new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    }),
    location : new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl(0, [Validators.required])
    })
  });

  accommodationClicked() {
    let firstImageUrl = '';
    if (this.accommodation.value.imageUrls && this.accommodation.value.imageUrls.length > 0) {
      firstImageUrl = this.accommodation.value.imageUrls[0];
    }
    let ammineities='';
    let splitArray = ammineities.split(',');
    let amenitiesList: Amenity[] = [];
    for (let i = 0; i < splitArray.length; i++) {
      let amenity: Amenity = { name: splitArray[i] };
      amenitiesList.push(amenity);
    }

    const token = localStorage.getItem('user');
    // const accommodationData: Accommodation = {
    //   id: 0,
    //   accepted: false,
    //   automaticActivation: false,
    //   description: this.accommodation.value.describe || "",
    //   minPeople: this.accommodation.value.minPeople || 0,
    //   maxPeople: this.accommodation.value.maxPeople || 0,
    //   photo: "",
    //   typeAccomodation:TypeAccommodation.Apartment,
    //   rating: this.accommodation.value.rating || 0,
    //   cancelDeadline: this.accommodation.value.limit || 0,
    //   prices:[],
    //   takenDates:[],
    //   amenities: amenitiesList,
    //   location:null,
    //   owner:{
    //     name: "Luka",
    //     surname: "Popovic",
    //     phone: "0655197633",
    //     address: "Adresa1",
    //   },
    //   reservations:[]
    // };
    //
    // this.service.add(accommodationData).subscribe({
    //   next: (_) =>{
    //     console.log("Uspesan zahtev");
    //     console.log(localStorage.getItem('user'));
    //   }
    // });
  }

  myDataArray = [
  ];

  displayedColumns: string[] = ['firstDate', 'endDate', 'price'];
  dataSource = new MatTableDataSource<any>(this.myDataArray);

  onUserTypeChange(event: MatRadioChange) {
    this.accommodation.patchValue({ UserType: event.value });
  }

  onConfirmationTypeChange($event: MatRadioChange) {
    //this.accommodation.patchValue({ ConfirmationType: event.value });
  }

  onTypeAccChange($event: MatRadioChange) {
    //this.accommodation.patchValue({ TypeAcc:event.value });
  }

  imageUrls: string[] = [];

  onFilesSelected(event: any) {
    const files: File[] = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrls.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  addNewRow() {
    const newRow = {
      firstDate:this.dateRangeForm.value.startDate,
      EndDate:this.dateRangeForm.value.endDate,
      price:this.dateRangeForm.value.price
    };
    const data = this.dataSource.data;
    data.push(newRow);
    this.dataSource.data = data;
  }
  ngOnInit(): void {
  }
}
