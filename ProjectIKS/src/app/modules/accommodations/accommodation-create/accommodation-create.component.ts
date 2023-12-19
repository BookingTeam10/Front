import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
import {EditAccommodation} from "../../../models/EditAccommodation";
import {ActivatedRoute, Router} from "@angular/router";


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
  constructor(private service:AccommodationService,private route: ActivatedRoute,private router: Router,  private userService: UserServiceService, private loginService: LoginService,private cd: ChangeDetectorRef) {
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required])
    });
  }

  accommodation: Accommodation;

  accommodationData: EditAccommodation = {
    name: '',
    minPeople: '',
    maxPeople: '',
    country: '',
    city: '',
    street: '',
    ConfirmationType: false,
  };

  imageUrls: string[] = [];


  getAccommodationData(): Accommodation | null {
    const name = this.getValueById('name');
    const minPeople = this.getValueById('minPeople');
    const maxPeople = this.getValueById('maxPeople');
    const country = this.getValueById('country');
    const city = this.getValueById('city');
    const street = this.getValueById('street');
    const confirmationType = document.getElementById("automaticConfirmation") as HTMLInputElement | null;


    if (!name || !minPeople || !maxPeople || !country || !city || !street || !confirmationType) {
      this.wrongInput();
      return null;
    }

    const accommodation:Accommodation = {
      id:100,
      name: name,
      accepted:false,
      automaticActivation:false,
      description:"",
      minPeople: parseInt(minPeople),
      maxPeople: parseInt(maxPeople),
      photos: this.imageUrls,
      type:TypeAccommodation.Apartment,
      rating:0,
      cancelDeadline:5,
      prices:[],
      takenDates:[],
      amenities:[],
      location: {
        country: "Srbija",
        city: "Novi Sad",
        street: "Gunduliceva",
        id: 1,
        number: 21
      },
      owner:this.owner,
      reservations:[],
      weekendPrice:5,
      holidayPrice:5,
      summerPrice:5,
      isNight:true,
      accommodationStatus: AccommodationStatus.EDITED,
      automaticConfirmation: confirmationType.checked,
    };
    return accommodation;
  }

  private getValueById(id: string): string | null {
    const element = document.getElementById(id) as HTMLInputElement | null;
    const value = element?.value.trim();
    if (element === null || value === "" || element === undefined || value === undefined) {
      return null;
    }
    return value;
  }

  selectedOption: string = 'night';

  // accommodation = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   describe:new FormControl('', [Validators.required]),
  //   minPeople: new FormControl(0, [Validators.required]),
  //   maxPeople: new FormControl(0, [Validators.required]),
  //   ammineity: new FormControl('', [Validators.required]),
  //   rating:new FormControl(0, [Validators.required]),
  //   weekendPrice: new FormControl(0, [Validators.required]),
  //   holidayPrice: new FormControl(0, [Validators.required]),
  //   summerPrice: new FormControl(0, [Validators.required]),
  //   limit: new FormControl(0, [Validators.required]),
  //   UserType: new FormControl('', [Validators.required]),
  //   ConfirmationType: new FormControl('', [Validators.required]),
  //   TypeAcc: new FormControl('', [Validators.required]),
  //   dataSource: new FormArray([]),
  //   imageUrls: new FormArray([]),
  //   country: new FormControl('', [Validators.required]),
  //   city: new FormControl('', [Validators.required]),
  //   street: new FormControl('', [Validators.required]),
  //   number: new FormControl(0, [Validators.required])
  // });
  // private user: Owner;
  //
  // accommodationClicked() {
  //
  //   console.log(this.owner);
  //
  //   const amenities = [];
  //
  //   console.log(this.accommodation.value.name);
  //
  //   const splitted = this.accommodation.value.ammineity?.split(", ");
  //
  //   const isNightRadio = document.getElementById("isNightRadio") as HTMLInputElement | null;
  //   const autoConf = document.getElementById("autoConf") as HTMLInputElement | null;
  //   const accType = document.getElementById("accType") as HTMLInputElement | null;
  //   if(isNightRadio == null || autoConf == null || accType == null){
  //     return;
  //   }
  //
  //   for (const splittedKey in splitted) {
  //     const amenity: Amenity = {
  //       name: splittedKey
  //     }
  //     amenities.push(amenity);
  //   }
  //
  //   const type =  accType.checked ? TypeAccommodation.Apartment : TypeAccommodation.Room;
  //
  //   const accommodationData: Accommodation = {
  //     id:0,
  //     name:this.accommodation.value.name || "",
  //     accepted: false,
  //     automaticActivation: false,
  //     description: this.accommodation.value.describe || "",
  //     minPeople: this.accommodation.value.minPeople || 0,
  //     maxPeople: this.accommodation.value.maxPeople || 0,
  //     photos:this.imageUrls,
  //     type : type,
  //     rating: this.accommodation.value.rating || 0,
  //     cancelDeadline: this.accommodation.value.limit || 0,
  //     prices:this.dataSource.data,
  //     takenDates:this.takenDates,
  //     amenities: amenities,
  //     location:{
  //       id: 1,
  //       country : this.accommodation.value.country || "",
  //       city : this.accommodation.value.city || "",
  //       street : this.accommodation.value.street || "",
  //       number : this.accommodation.value.number || 0
  //     },
  //     owner: this.owner,
  //     reservations:[],
  //     weekendPrice:this.accommodation.value.weekendPrice || 0,
  //     holidayPrice:this.accommodation.value.holidayPrice|| 0,
  //     summerPrice:this.accommodation.value.summerPrice || 0,
  //     isNight: isNightRadio.checked,
  //     accommodationStatus: AccommodationStatus.CREATED,
  //     automaticConfirmation: autoConf.checked
  //   };
  //
  //   console.log("ACC")
  //   console.log(accommodationData)
  //   this.service.add(accommodationData).subscribe({
  //     next: (_) =>{
  //       console.log("Uspesan zahtev");
  //     }
  //   });
  // }
  //
  //
  // onUserTypeChange(event: MatRadioChange) {
  //   this.accommodation.patchValue({ UserType: event.value });
  // }
  //
  // onConfirmationTypeChange($event: MatRadioChange) {
  //   //this.accommodation.patchValue({ ConfirmationType: event.value });
  // }
  //
  // onTypeAccChange($event: MatRadioChange) {
  //   //this.accommodation.patchValue({ TypeAcc:event.value });
  // }
  //
  // onFilesSelected(event: any) {
  //   const files: File[] = event.target.files;
  //
  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageUrls.push(e.target.result);
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // }
  //
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
    //this.setValues();
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

  setValues(){

    function loadAmenities(amenities: Amenity[]) {
      let ret = "";
      for (let i = 0; i < amenities.length -1; i++) {
        ret += amenities[i] +  ", ";
      }

      ret += amenities[amenities.length-1];
      return ret;
    }

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.service.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;

          this.setValueById('name', data.name);
          this.setValueById('minPeople', data.minPeople.toString());
          this.setValueById('maxPeople', data.maxPeople.toString());
          this.setValueById('country', data.location.country);
          // this.setValueById('amenity', loadAmenities(data.amenities));
          this.setValueById('city', data.location.city);
          this.setValueById('street', data.location.street + " " + data.location.number);
          this.setValueById('description', data.description);

          const automaticConfirmationRadio = document.getElementById('automaticConfirmation') as HTMLInputElement;
          const automaticConfirmation2Radio = document.getElementById('automaticConfirmation2') as HTMLInputElement;


          if (data.automaticConfirmation) {
            automaticConfirmationRadio.checked = true;
          } else {
            automaticConfirmation2Radio.checked = true;
          }

          if (data && data.photos) {
            this.imageUrls = [...data.photos];
          }

          this.cd.detectChanges();
        },
      });
    });
  }
  private setValueById(id: string, value: string): void {
    const element = document.getElementById(id) as HTMLInputElement | null;
    if (element) {
      element.value = value;
    }
  }
  wrongInput(errorMessage: string = "Wrong entries. Please check your input values."): void {
    alert(errorMessage);
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  saveChanges() {
    console.log("UDJE OVDE")
    //this.getAccommodationData();
    const a=this.getAccommodationData();
    console.log(a);
    if(a!=null){
      this.service.add(a).subscribe((response: any) =>{});

      // this.router.navigate(['/owners/accommodations'])
      //   .then(() => {
      //     window.location.reload();
      //   });
    }
  }

}
