import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CertificateRequest} from "../../../models/certificateRequest";
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/service/login.service";
import {HttpClient} from "@angular/common/http";
import {SuperAdminService} from "../service/superadmin.service";

@Component({
  selector: 'app-certificates-card',
  templateUrl: './certificates-card.component.html',
  styleUrls: ['./certificates-card.component.css']
})
export class CertificatesCardComponent {
  @Input()
  treeNode: any;

  constructor(private router: Router, public loginService: LoginService,private httpClient: HttpClient,private adminService:SuperAdminService) {
  }

  @Output()
  clicked: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    this.adminService.getAllCertificates().subscribe({
      next: (data: any[]) => {
        this.adminService.certificateSubject.next(data); // Emitujte inicijalne podatke
        console.log("POGODIII");
        console.log(data);
      },
    });
  }
}
