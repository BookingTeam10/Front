import {Component, OnInit} from "@angular/core";
import {MatRadioChange} from "@angular/material/radio";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../service/accommodation.service";
import {Accommodation} from "../../../models/accommodation";
import {EditAccommodation} from "../../../models/EditAccommodation";

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css']
})


export class EditAccommodationComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService) {}

  accommodation: Accommodation;



  accommodationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    minPeople: new FormControl('', [Validators.required]),
    maxPeople: new FormControl('', [Validators.required]),
    amenity: new FormControl('', [Validators.required]),
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
    console.log(this.accommodationForm.value)
    const accommodationData:EditAccommodation={
      name:this.accommodationForm.value.name || "",
      minPeople:this.accommodationForm.value.minPeople || "",
      maxPeople:this.accommodationForm.value.maxPeople || "",
      amenity:this.accommodationForm.value.amenity || "",
      price:this.accommodationForm.value.price || "",
      weekendPrice:this.accommodationForm.value.weekendPrice || "",
      holidayPrice:this.accommodationForm.value.holidayPrice || "",
      summerPrice:this.accommodationForm.value.summerPrice || "",
      country:this.accommodationForm.value.country || "",
      city:this.accommodationForm.value.city || "",
      street:this.accommodationForm.value.street || "",
      number:this.accommodationForm.value.number || "",
      limit:this.accommodationForm.value.limit || "",
      userType:this.accommodationForm.value.userType,
      ConfirmationType:this.accommodationForm.value.confirmationType,
      TypeAcc:this.accommodationForm.value.typeAcc,
      FirstDate:this.accommodationForm.value.firstDate,
      EndDate:this.accommodationForm.value.endDate,
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
    this.accommodationForm.patchValue({ userType: event.value });
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
    this.route.params.subscribe((params) => {
        const id = +params['accommodationId']
        this.accommodationService.getAccommodation(id).subscribe({
          next: (data: Accommodation) => {
            this.accommodation = data

            // kakvi su ovo fieldovi
            this.accommodationForm.setValue({
              name: '',
              minPeople: this.accommodation.minPeople.toString(),
              maxPeople: this.accommodation.maxPeople.toString(),
              amenity: '',
              city: "",
              confirmationType: '',
              country: "",
              endDate: '',
              firstDate: '',
              holidayPrice: '',
              limit: '',
              number: '',
              price: '',
              street: "",
              summerPrice: '',
              typeAcc: "",
              userType: '',
              weekendPrice: ''
            })

          }
        })
      }
    )
  }
}
