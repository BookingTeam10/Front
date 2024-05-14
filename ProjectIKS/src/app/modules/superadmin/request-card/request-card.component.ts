import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Accommodation, Price} from "../../../models/accommodation";
import {Guest} from "../../../models/users/guest";
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {SuperAdminService} from "../service/superadmin.service";
import {RequestDTO} from "../../../models/request";
import {CertificateRequest} from "../../../models/certificateRequest";

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent implements OnInit{

  @Input()
  request: CertificateRequest;

  constructor(private router: Router, public loginService: LoginService,private httpClient: HttpClient,private adminService:SuperAdminService) {
  }

  @Output()
  clicked: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
      this.adminService.getAll().subscribe({
        next: (data: CertificateRequest[]) => {
          this.adminService.requestsSubject.next(data); // Emitujte inicijalne podatke
          console.log(data);
        },
      });
  }

  createCertificate(request: CertificateRequest) {
    console.log(this.request)
    // var certificateRequest:CertificateRequest={
    //   id: 5,
    //   firstName: "A",
    //   lastName: "B",
    //   email: request.email,
    //   password: "D",
    //   organization: "E",
    //   country: "F",
    //   publicKey: null,
    //   publicKeyString:"AAA",
    //   role: "Owner"
    // }
    // this.adminService.addCertificate(certificateRequest).subscribe({
    //   next: (data:any) => {
    //     console.log(data);
    //   },
    // });
    //this.router.navigate(['/certificate-approve']);
    this.router.navigate(['/certificate-approve'], { state: { request } });
  }

  declineCertificate(request: CertificateRequest) {
    console.log(this.request)
    this.adminService.declineCertificate(this.request.id)
      .subscribe(
        () => {
          console.log('Accommodation deleted successfully.');
          // You can perform additional actions after successful deletion if needed
        },
        error => {
          console.error('Error deleting accommodation:', error);
          // Handle error appropriately, such as displaying an error message to the user
        }
      );
  }
}
