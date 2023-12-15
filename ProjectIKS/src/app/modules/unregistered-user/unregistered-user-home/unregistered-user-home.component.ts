import { Component } from '@angular/core';
import {Accommodation} from "../../../models/accommodation";
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-unregistered-user-home',
  templateUrl: './unregistered-user-home.component.html',
  styleUrls: ['./unregistered-user-home.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class UnregisteredUserHomeComponent {
  constructor(private http: HttpClient) { }
}
