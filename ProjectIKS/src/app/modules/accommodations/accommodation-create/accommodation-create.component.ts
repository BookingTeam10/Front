import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import {MatTableDataSource} from '@angular/material/table';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../service/accommodation.service";
import {Accommodation, TypeAccommodation} from "../../../models/accommodation";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Owner} from "../../../models/users/owner";


@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit{

  dateRangeForm: FormGroup;
  constructor(private service:AccommodationService, public jwtHelper: JwtHelperService) {
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required])
    });
  }

  imageUrls: string[] = [];

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
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl(0, [Validators.required])
    // location : new FormGroup({
    //   country: new FormControl('', [Validators.required]),
    //   city: new FormControl('', [Validators.required]),
    //   street: new FormControl('', [Validators.required]),
    //   number: new FormControl(0, [Validators.required])
    // })
  });
  private user: Owner;

  accommodationClicked() {

    const token = localStorage.getItem('User');   //ovo dekodirati
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const user = decodedToken.user;
      this.user=user;
    }
    const accommodationData: Accommodation = {
      id:0,
      name:this.accommodation.value.name || "",
      accepted: false,
      automaticActivation: false,
      description: this.accommodation.value.describe || "",
      minPeople: this.accommodation.value.minPeople || 0,
      maxPeople: this.accommodation.value.maxPeople || 0,
      photos:this.imageUrls,
      type:TypeAccommodation.Apartment,
      rating: this.accommodation.value.rating || 0,
      cancelDeadline: this.accommodation.value.limit || 0,
      prices:[],
      takenDates:[],
      amenities: [],
      location:{
        country : this.accommodation.value.country || "",
        city : this.accommodation.value.city || "",
        street : this.accommodation.value.street || "",
        number : this.accommodation.value.number || 0
      },
      owner:this.user,
      reservations:[],
      weekendPrice:this.accommodation.value.weekendPrice || 0,
      holidayPrice:this.accommodation.value.holidayPrice|| 0,
      summerPrice:this.accommodation.value.summerPrice || 0,
      isNight:true
    };

    this.service.add(accommodationData).subscribe({
      next: (_) =>{
        console.log("Uspesan zahtev");
      }
    });
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
