import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatRadioChange } from "@angular/material/radio";
import { AccommodationService } from "../service/accommodation.service";
import {Accommodation, Amenity} from "../../../models/accommodation";
import { EditAccommodation } from "../../../models/EditAccommodation";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css']
})

export class EditAccommodationComponent implements OnInit, AfterViewInit {
  dateRangeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accommodationService: AccommodationService,
    private cd: ChangeDetectorRef
  ) {
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

  getAccommodationData(): void {
    const name = this.getValueById('name');
    const minPeople = this.getValueById('minPeople');
    const maxPeople = this.getValueById('maxPeople');
    const country = this.getValueById('country');
    const city = this.getValueById('city');
    const street = this.getValueById('street');
    const confirmationType = document.getElementById("automaticConfirmation") as HTMLInputElement | null;

    if (!name || !minPeople || !maxPeople || !country || !city || !street || !confirmationType) {
      this.wrongInput();
      return;
    }

    this.accommodationData = {
      name: name,
      minPeople: minPeople,
      maxPeople: maxPeople,
      country: country,
      city: city,
      street: street,
      ConfirmationType: confirmationType.checked,
    };
  }

  private getValueById(id: string): string | null {
    const element = document.getElementById(id) as HTMLInputElement | null;
    const value = element?.value.trim();
    if (element === null || value === "" || element === undefined || value === undefined) {
      return null;
    }
    return value;
  }

  imageUrls: string[] = [];
  selectedOption: string = 'night';
  myDataArray = [];
  dataSource = new MatTableDataSource<any>(this.myDataArray);
  displayedColumns: string[] = ['firstDate', 'endDate', 'price'];
  editBasic: boolean = true;


  ngOnInit(): void {
    function loadAmenities(amenities: Amenity[]) {
      let ret = "";
      for (let i = 0; i < amenities.length -1; i++) {
          ret += amenities[i] +  ", ";
      }

      ret += amenities[amenities.length-1];
      return ret;
    }

    this.setValues();
  }


  setValues(){
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;

          this.setValueById('name', "");
          this.setValueById('minPeople', data.minPeople.toString());
          this.setValueById('maxPeople', data.maxPeople.toString());
          this.setValueById('country', data.location.country);
          // this.setValueById('amenity', loadAmenities(data.amenities))
          this.setValueById('city', data.location.city);
          this.setValueById('street', data.location.street);
          this.setValueById('description', data.description);

          const automaticConfirmationRadio = document.getElementById('automaticConfirmation') as HTMLInputElement;
          const automaticConfirmation2Radio = document.getElementById('automaticConfirmation2') as HTMLInputElement;


          if (data.automaticConfirmation) {
            automaticConfirmationRadio.checked = true;
          } else {
            automaticConfirmation2Radio.checked = true;
          }

          if (data && data.photoes) {
            this.imageUrls = [...data.photoes];
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



  openCancelDialog() {
    const isConfirmed = window.confirm('Are you sure you want to cancel changes to this item?');

    if (isConfirmed) {
      this.exitPage();
    }
  }

  private exitPage() {
      this.router.navigate(['/owners/accommodations']);
  }

  saveChanges() {
    this.getAccommodationData();

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

  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }

  changePrices(event: Event) {
    event.preventDefault();
    this.editBasic = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() =>{
       this.setPriceValues();
    })
  }

  ngAfterViewInit() {
    setTimeout(() =>{
      this.setValues();
    })
  }


  closeChangePrice(event: MouseEvent) {
    event.preventDefault();
    this.editBasic = true;
    this.ngAfterViewInit();
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
  onUserTypeChange($event: MatRadioChange) {
    console.log('Izabrana vrednost:', this.selectedOption);
  }

  private setPriceValues() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;

          this.setValueById('weekendPrice', '');
          this.setValueById('holidayPrice', '');
          this.setValueById('summerPrice', '');
          this.setValueById('cancelLimit', '');


          this.cd.detectChanges();
        },
      });
    });
  }
}
