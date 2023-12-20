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
import {formatDate} from "@angular/common";


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
  displayedColumns: string[] = ['firstDate', 'endDate', 'price','actions'];
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
    const weekendPrice = this.getValueById('weekendPrice');
    const holidayPrice = this.getValueById('holidayPrice');
    const summerPrice = this.getValueById('summerPrice');
    const cancelDeadline = this.getValueById('limit');
    const confirmationType = document.getElementById("automaticConfirmation") as HTMLInputElement | null;


    if (!name || !minPeople || !maxPeople || !country || !city || !street || !confirmationType || !weekendPrice || !holidayPrice  || !summerPrice || !cancelDeadline) {
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
      cancelDeadline:parseInt(cancelDeadline),
      prices:this.dataSource.data,
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
      weekendPrice:parseInt(weekendPrice),
      holidayPrice:parseInt(holidayPrice),
      summerPrice:parseInt(summerPrice),
      isNight:true,
      accommodationStatus: AccommodationStatus.CREATED,
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
  // addNewRow() {
  //   const newRow:Price = {
  //     startDate:this.dateRangeForm.value.startDate,
  //     endDate:this.dateRangeForm.value.endDate,
  //     price:this.dateRangeForm.value.price
  //   };
  //
  //   const newTakenDate:TakenDate = {
  //     firstDate:this.dateRangeForm.value.startDate,
  //     endDate:this.dateRangeForm.value.endDate,
  //   }
  //
  //   this.takenDates.push(newTakenDate);
  //   const data = this.dataSource.data;
  //   data.push(newRow);
  //   this.dataSource.data = data;
  // }
  addNewRow() {

    if(this.dateRangeForm.valid) {
      const startDate = new Date(this.dateRangeForm.value.startDate);
      const endDate = new Date(this.dateRangeForm.value.endDate);

      const formattedStartDate = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedEndDate = endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedStartDateYYYYMMDD = startDate.toISOString().split('T')[0];
      const formattedEndDateYYYYMMDD = endDate.toISOString().split('T')[0];
      const newRow:Price = {
        startDate: formattedStartDateYYYYMMDD,
        endDate: formattedEndDateYYYYMMDD,
        price: this.dateRangeForm.value.price
      };

      const data = this.dataSource.data;
      data.push(newRow);
      this.dataSource.data = [...data];
      this.dateRangeForm.reset();
    }}

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

      this.router.navigate(['/owners/accommodations'])
        .then(() => {
          window.location.reload();
        });
    }
  }
  formatDate(dateString: string): string {

    const dateObject = new Date(dateString);
    return dateObject.toISOString().split('T')[0];
  }

  deleteRow(element: Price) {

    const data = this.dataSource.data;
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      data.splice(index, 1);
    }
    this.dataSource.data = data;
  }
}
