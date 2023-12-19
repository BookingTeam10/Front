import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import {MatTableDataSource} from '@angular/material/table';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../service/accommodation.service";
import {
  Accommodation,
  AccommodationStatus,
  Amenity,
  Price,
  TakenDate,
  TypeAccommodation
} from "../../../models/accommodation";
import {Owner} from "../../../models/users/owner";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {LoginService} from "../../auth/login/service/login.service";


@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit{

  dateRangeForm: FormGroup;
  private owner: Owner;
  myDataArray = [
  ];

  takenDates: TakenDate[] = [];
  displayedColumns: string[] = ['firstDate', 'endDate', 'price'];
  dataSource = new MatTableDataSource<Price>(this.myDataArray);
  constructor(private service:AccommodationService,  private userService: UserServiceService, private loginService: LoginService) {
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

    console.log(this.owner);

    const amenities = [];

    const splitted = this.accommodation.value.ammineity?.split(", ");

    const isNightRadio = document.getElementById("isNightRadio") as HTMLInputElement | null;
    const autoConf = document.getElementById("autoConf") as HTMLInputElement | null;
    const accType = document.getElementById("accType") as HTMLInputElement | null;
    if(isNightRadio == null || autoConf == null || accType == null){
      return;
    }

    for (const splittedKey in splitted) {
        const amenity: Amenity = {
          name: splittedKey
        }
        amenities.push(amenity);
    }

    const type =  accType.checked ? TypeAccommodation.Apartment : TypeAccommodation.Room;

    const accommodationData: Accommodation = {
      id:0,
      name:this.accommodation.value.name || "",
      accepted: false,
      automaticActivation: false,
      description: this.accommodation.value.describe || "",
      minPeople: this.accommodation.value.minPeople || 0,
      maxPeople: this.accommodation.value.maxPeople || 0,
      photos:this.imageUrls,
      type : type,
      rating: this.accommodation.value.rating || 0,
      cancelDeadline: this.accommodation.value.limit || 0,
      prices:this.dataSource.data,
      takenDates:this.takenDates,
      amenities: amenities,
      location:{
        id: 1,
        country : this.accommodation.value.country || "",
        city : this.accommodation.value.city || "",
        street : this.accommodation.value.street || "",
        number : this.accommodation.value.number || 0
      },
      owner: this.owner,
      reservations:[],
      weekendPrice:this.accommodation.value.weekendPrice || 0,
      holidayPrice:this.accommodation.value.holidayPrice|| 0,
      summerPrice:this.accommodation.value.summerPrice || 0,
      isNight: isNightRadio.checked,
      accommodationStatus: AccommodationStatus.CREATED,
      automaticConfirmation: autoConf.checked
    };

    this.service.add(accommodationData).subscribe({
      next: (_) =>{
        console.log("Uspesan zahtev");
      }
    });
  }


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
    const newRow:Price = {

      startDate:this.dateRangeForm.value.startDate,
      endDate:this.dateRangeForm.value.endDate,
      price:this.dateRangeForm.value.price
    };

    const newTakenDate:TakenDate = {
      firstDate:this.dateRangeForm.value.startDate,
      endDate:this.dateRangeForm.value.endDate,
    }

    this.takenDates.push(newTakenDate);
    const data = this.dataSource.data;
    data.push(newRow);
    this.dataSource.data = data;
  }
  ngOnInit(): void {
    this.loadUser();
  }

  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }

  loadUser() {

    this.userService.getOwner(this.loginService.getUsername()).subscribe(
      (owner: Owner) => {
        this.owner = owner;
      }
    );
  }


}
