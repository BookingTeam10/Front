import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatRadioChange} from "@angular/material/radio";
import {AccommodationService} from "../service/accommodation.service";
import {Accommodation, AccommodationStatus, Amenity, Price} from "../../../models/accommodation";
import {EditAccommodation} from "../../../models/EditAccommodation";
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


  getAccommodationData(): void {
    const name = this.getValueById('name');
    const minPeople = this.getValueById('minPeople');
    const maxPeople = this.getValueById('maxPeople');
    const country = this.getValueById('country');
    const city = this.getValueById('city');
    const street = this.getValueById('street');
    const amenity = this.getValueById('amenity');
    const confirmationType = document.getElementById("automaticConfirmation") as HTMLInputElement | null;


    if (!name || !minPeople || !maxPeople || !country || !city || !street || !confirmationType) {
      this.wrongInput();
      return;
    }

    const amenities: Amenity[] = [];
    for (const splittedKey in amenity?.split(", ")) {
      const amenity: Amenity = {
        name: splittedKey
      }
      amenities.push(amenity);
    }

    this.accommodation = {
      ...this.accommodation,
      name: name,
      amenities:amenities,
      minPeople: parseInt(minPeople),
      maxPeople: parseInt(maxPeople),
      location: {
        country: country,
        city: city,
        street: street.split(" ")[0],
        id: this.accommodation.location.id,
        number: parseInt(street.split(" ")[1])
      },
      automaticConfirmation: confirmationType.checked,
      accommodationStatus: AccommodationStatus.EDITED,
      photos: this.imageUrls,

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
  myDataArray = [];
  dataSource: MatTableDataSource<any, any> = new MatTableDataSource<any>(this.myDataArray);
  displayedColumns: string[] = ['firstDate', 'endDate', 'price', 'actions'];
  editBasic: boolean = true;


  ngOnInit(): void {

    this.setValues();
  }


  setValues(){

    function loadAmenities(amenities: Amenity[]) {
      if(amenities == null){return "";}
      let ret = "";
      for (let i = 0; i < amenities.length -1; i++) {
        ret += amenities[i].name +  ", ";
      }

      ret += amenities[amenities.length-1].name;
      return ret;
    }

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;

          this.setValueById('name', data.name);
          this.setValueById('minPeople', data.minPeople.toString());
          this.setValueById('maxPeople', data.maxPeople.toString());
          this.setValueById('country', data.location.country);
          this.setValueById('amenity', loadAmenities(data.amenities));
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

    this.accommodationService.updateAccommodation(this.accommodation).subscribe((response: any) =>{});

    this.router.navigate(['/owners/accommodations'])
        .then(() => {
          window.location.reload();
        });
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
  formatDate(dateString: string): string {

    const dateObject = new Date(dateString);
    return dateObject.toISOString().split('T')[0];
  }

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
        this.dataSource.data = [...data]; // Make sure to create a new reference to trigger change detection
        this.dateRangeForm.reset(); // Reset the form after adding a new row
      }
  }
  deleteRow(element: Price) {

    const data = this.dataSource.data;
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      data.splice(index, 1);
    }
    this.dataSource.data = data;
  }

  private setPriceValues() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;


          this.setValueById('weekendPrice', this.accommodation.weekendPrice.toString());
          this.setValueById('holidayPrice', this.accommodation.holidayPrice.toString());
          this.setValueById('summerPrice', this.accommodation.summerPrice.toString());
          this.setValueById('cancelLimit', this.accommodation.cancelDeadline.toString());

          const perNightRadio = document.getElementById('perNight') as HTMLInputElement;
          const perPersonRadio = document.getElementById('perPerson') as HTMLInputElement;


          if (data.isNight) {
            perNightRadio.checked = true;
          } else {
            perPersonRadio.checked = true;
          }

          if(data.prices != null){
            this.dataSource = new MatTableDataSource(data.prices);
          }
          this.cd.detectChanges();
        },
      });
    });
  }

  savePrices(event: Event) {
        event.preventDefault();
        this.getAccommodationPriceData();

        //this.accommodationService.updateAccommodation(this.accommodation).subscribe((response: any) =>{});
        //this.accommodationService.updateAccommodation(this.accommodation).subscribe((response: any) =>{});
        this.accommodationService.updateAccommodation(this.accommodation).subscribe(response =>{
            alert(response.message);
        });
        this.editBasic = true;
        this.ngAfterViewInit();
  }

  private getAccommodationPriceData() {
    const weekendPrice = this.getValueById('weekendPrice');
    const holidayPrice = this.getValueById('holidayPrice');
    const summerPrice = this.getValueById('summerPrice');
    const cancelLimit = this.getValueById('cancelLimit');
    // const confirmationType = document.getElementById("automaticConfirmation") as HTMLInputElement | null;

    if (!weekendPrice || !holidayPrice || !summerPrice || !cancelLimit ) {
      this.wrongInput();
      return;
    }

    this.accommodation = {
      ...this.accommodation,
      weekendPrice: parseInt(weekendPrice),
      holidayPrice: parseInt(holidayPrice),
      summerPrice: parseInt(summerPrice),
      cancelDeadline: parseInt(cancelLimit),
      accommodationStatus: AccommodationStatus.EDITED,
      prices: this.dataSource.data
    }

  }
}
