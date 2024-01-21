import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, ChartOptions, ChartType} from 'chart.js';
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';
import {Guest} from "../../../models/users/guest";
import {LoginService} from "../../auth/login/service/login.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {ReservationService} from "../../reservation/reservation.service";
import {Router} from "@angular/router";
import {Owner} from "../../../models/users/owner";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {Accommodation} from "../../../models/accommodation";
import {Reservation, Report, ReportAccommodation} from "../../../models/reservation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;


@Component({
  selector: 'app-owner-reports',
  templateUrl: './owner-reports.component.html',
  styleUrls: ['./owner-reports.component.css'],

})
export class OwnerReportsComponent implements AfterViewInit {
  startDate: Date | null = null;
  endDate: Date | null = null;
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartCanvas2') chartCanvas2: ElementRef<HTMLCanvasElement>;
  chart: Chart;
  chart2: Chart;
  owner: Owner;
  accommodations:Accommodation[];
  reservations:Reservation[];
  reports:Report[];
  accommodationReport : ReportAccommodation;
  AccommodationCheckbox = new FormControl('');
  optionsCombobox: string[] = [''];
  filter: Observable<string[]>;
  ngOnInit() {
    this.loadOwner();
    this.accommodationService.getOwnerAccommodations(1).subscribe(
      (data: Accommodation[]) =>{
        this.accommodations = data;
        for(let accommodation of this.accommodations){
          // this.optionsCombobox = data.map(accommodation => `${accommodation.id}, ${accommodation.name}`);
          this.optionsCombobox.push(accommodation.id.toString()+", "+accommodation.name);
        }
      });
    this.filter = this.AccommodationCheckbox.valueChanges.pipe(
      startWith(''),
      map(valueType => this._filter(valueType || '')),
    );
  }

  constructor(private loginService: LoginService,
              private userService: UserServiceService,private accommodationService:AccommodationService,private reservationService:ReservationService) {
  }

  loadOwner(){
    this.userService.getOwner(this.loginService.getUsername()).subscribe((owner: Owner) => {
      this.owner = owner;
      console.log("Owner has been loaded:", this.owner);
    }, error => {
      console.error("Failed to load owner:", error);
    });
  }

  ngAfterViewInit() {
  }

  selectClicked() {
    this.reservationService.getOwnerReports(this.owner.id,this.startDate,this.endDate).subscribe(
      (data: Report[]) =>{
           this.reports = data;

          let labels: string[] = [];
          let profitData: number[] = [];
          let numberReservationData: number[] = [];
          for (let report of this.reports) {
            labels.push(report.accommodation.name); // Ensure 'accommodation' is the correct property name
            profitData.push(report.profit);
            numberReservationData.push(report.numberReservation)
          }

          this.chart = new Chart(this.chartCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: labels, // Assign the dynamically generated labels here
            datasets: [{
              label: 'Profit',
              data: profitData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }, {
              label: 'Number reservations',
              data: numberReservationData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      });
  }

  generatePDF() {
    html2canvas(this.chartCanvas.nativeElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'cm', 'a4'); // Kreira PDF u pejzažnom modu
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);

      pdf.addPage();

      html2canvas(this.chartCanvas2.nativeElement).then(canvas => {
        const contentDataURL2 = canvas.toDataURL('image/png');
        pdf.addImage(contentDataURL2, 'PNG', 0, 0, 29.7, 21.0);
        pdf.save('grafikoni.pdf'); // Sačuvajte PDF sa oba grafikona
      });
    });
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    console.log(filterValue);
    console.log(this.optionsCombobox)
    return this.optionsCombobox.filter(option => option.toLowerCase().includes(filterValue));
  }

  accommodationForm = new FormGroup({
    formControl: new FormControl('', [Validators.required]),
  });

  selectClickedAccommodation() {
    const stringValue: any = this.AccommodationCheckbox.value; // 'any' ako niste sigurni u tip
    let id:number = 1;
    if (typeof stringValue === 'string') {
      const parts: string[] = stringValue.split(', ');
      const parsedId = parseInt(parts[0], 10); // 10 je osnova za decimalni sistem
      if (!isNaN(parsedId)) {
        id = parsedId;
      }
    }


    this.reservationService.getOwnerReportsAccommodation(id).subscribe(
      (data: ReportAccommodation) =>{
        this.accommodationReport = data;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();

        let labels: string[] = [];
        for (let i = 0; i < 12; i++) {
            const nameMonths = months[date.getMonth()];
            labels.push(nameMonths)
            date.setMonth(date.getMonth() + 1);
        }
        const sveVrednosti = Object.values(this.accommodationReport.map);

        let lista1: number[] = [];
        let lista2: number[] = [];

        sveVrednosti.forEach(vrednosti => {
          if (vrednosti[0] !== undefined) {
            lista1.push(vrednosti[0]);
          }
          if (vrednosti[1] !== undefined) {
            lista2.push(vrednosti[1]);
          }
        });

        if (this.chart2) {
          this.chart2.destroy();
        }

        this.chart2 = new Chart(this.chartCanvas2.nativeElement, {
          type: 'bar',
          data: {
            labels: labels, // Assign the dynamically generated labels here
            datasets: [{
              label: 'Profit',
              data: lista1,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }, {
              label: 'Number reservations',
              data: lista2,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      });
  }
}
