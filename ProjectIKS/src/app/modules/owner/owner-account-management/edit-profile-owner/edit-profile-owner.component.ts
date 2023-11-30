// edit-profile-owner.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile-owner',
  templateUrl: './edit-profile-owner.component.html',
  styleUrls: ['./edit-profile-owner.component.css']
})
export class EditProfileOwnerComponent {
  emailVal: string = 'aleksa@gmail.com';
  passwordVal: string = 'aleksa';
  nameVal: string = 'Aleksa';
  surnameVal: string = 'Janjiċ';
  addressVal: string = 'Bulevar Kralja Petra 15';
  phoneVal: string = '064512390';
  createdNot: boolean = true;
  cancelledNot: boolean = false;
  rateNot: boolean = true;
  rateAccNot: boolean = false;
}
