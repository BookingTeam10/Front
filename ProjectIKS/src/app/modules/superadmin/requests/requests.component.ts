import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import {AccommodationService} from "../../accommodations/service/accommodation.service";
import {LoginService} from "../../auth/login/service/login.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {SuperAdminService} from "../service/superadmin.service";
import {RequestDTO} from "../../../models/request";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: RequestDTO[] = [];

  constructor(private service: SuperAdminService ,public loginService:LoginService, private router : Router, private userService: UserServiceService) {}

    ngOnInit(): void {
      this.service.getAll().subscribe({
        next: (data: RequestDTO[]) => {
          this.requests = data
          console.log("REQUESTOVI")
          console.log(this.requests)
        }
      })
    }

}
