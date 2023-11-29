// edit-profile-owner.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile-owner',
  templateUrl: './edit-profile-owner.component.html',
  styleUrls: ['./edit-profile-owner.component.css']
})
export class EditProfileOwnerComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  address: string = '';
  phone: string = '';
}
