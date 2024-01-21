import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from "../../../models/users/owner";
import { LoginService } from "../../auth/login/service/login.service";
import { Admin } from "../../../models/users/user";
import { Guest } from "../../../models/users/guest";
import { UserServiceService } from "../../unregistered-user/signup/user-service.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    public loginService: LoginService,
    private userService: UserServiceService
  ) { }

  owner: Owner;
  admin: Admin;
  guest: Guest;
  showPasswordChangeForm = false;
  oldUsername = "";

  openDeleteDialog(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (isConfirmed) {
      this.deleteProfile();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to apply changes to this item?');

    if (isConfirmed) {
      if (!this.getValues(this.loginService.getRole())) { return; }
      this.updateProfile();
    }
  }

  openChangePasswordDialog(event: Event) {
    event.preventDefault();
    this.showPasswordChangeForm = true;
  }

  closePasswordDialog(event: Event) {
    event.preventDefault();
    this.showPasswordChangeForm = false;
    this.ngAfterViewInit();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.executeAfterViewInitLogic();
    });
  }

  executeAfterViewInitLogic(): void {
    this.setValues(this.loginService.getRole());
  }

  exitPage(leave: boolean) {
    let url = '/accommodations';

    if(!leave) {
      if (this.loginService.getRole() == 'ROLE_Administrator') {
        url = "/admin/accommodations";
      } else if (this.loginService.getRole() == 'ROLE_Guest') {
        url = "/guests/accommodations";
      } else if (this.loginService.getRole() == 'ROLE_Owner') {
        url = "/owners/accommodations";
      }
    }

    //window.close();
    this.router.navigate([url]);
  }

  openCancelDialog() {
    const isConfirmed = window.confirm('Are you sure you want to cancel changes to this item?');

    if (isConfirmed) {
      this.exitPage(false);
    }
  }

  ngOnInit(): void {
    console.log(this.loginService.getRole())
    if (this.loginService.getRole() == 'ROLE_Administrator') {
      this.userService.getAdmin(this.loginService.getUsername()).subscribe(
        (admin: Admin) => {
          this.admin = admin;
          this.oldUsername = admin.email;
          this.setValues('ROLE_Administrator');
        }
      );
    } else if (this.loginService.getRole() == 'ROLE_Guest') {
      this.userService.getGuest(this.loginService.getUsername()).subscribe(
        (guest: Guest) => {
          this.guest = guest;
          this.oldUsername = guest.email;
          console.log(guest);
          this.setValues('ROLE_Guest');
        }
      );
    } else {
      this.userService.getOwner(this.loginService.getUsername()).subscribe(
        (owner: Owner) => {
          this.owner = owner;
          this.oldUsername = owner.email;
          this.setValues('ROLE_Owner');
        }
      );
    }
  }


  getValues(role: string): boolean {
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const surnameInput = document.getElementById('surname') as HTMLInputElement | null;

    if (
      emailInput &&
      nameInput &&
      surnameInput &&
      emailInput?.value !== '' &&
      nameInput?.value !== '' &&
      surnameInput?.value !== ''
    ) {;
      if (role === 'ROLE_Administrator') {
        this.admin.email = emailInput?.value;
        this.admin.name = nameInput?.value;
        this.admin.surname = surnameInput?.value;
      } else if (role === 'ROLE_Guest') {
        const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
        const addressInput = document.getElementById('address') as HTMLInputElement | null;
        const turnOffNotification = document.getElementById('turnNotificationOn') as HTMLInputElement | null;

        if (phoneInput) this.guest.phone = phoneInput.value;
        if (addressInput) this.guest.address = addressInput.value;
        if (turnOffNotification) this.guest.turnOnNotification = turnOffNotification.checked;

        this.guest.email = emailInput?.value;
        this.guest.name = nameInput?.value;
        this.guest.surname = surnameInput?.value;

      } else {
        const createdNotification = document.getElementById('createdNotification') as HTMLInputElement | null;
        const cancelledNotification = document.getElementById('cancelledNotification') as HTMLInputElement | null;
        const rateMeNotifications = document.getElementById('notificationRateMe') as HTMLInputElement | null;
        const rateAccommodation = document.getElementById('notificationRateAccommodation') as HTMLInputElement | null;

        if (createdNotification) this.owner.createdNotification = createdNotification.checked;
        if (cancelledNotification) this.owner.cancelledNotification = cancelledNotification.checked;
        if (rateMeNotifications) this.owner.rateMeNotification = rateMeNotifications.checked;
        if (rateAccommodation) this.owner.rateAccommodationNotification = rateAccommodation.checked;

        this.owner.email = emailInput?.value;
        this.owner.name = nameInput?.value;
        this.owner.surname = surnameInput?.value;
      }
    } else {
      this.wrongInput();
      return false;
    }

    return true;
  }


  wrongInput(errorMessage: string = "Wrong entries. Please check your input values."): void {
    alert(errorMessage);
  }

  private deleteProfile(): void {
    this.userService.delete(this.admin, this.guest, this.owner);
    this.exitPage(true);
  }

  private async updateProfile(): Promise<void> {
    const res = this.userService.update(this.admin, this.guest, this.owner, this.oldUsername);


    res.subscribe(
      (result) => {
        if(result){
            alert("Username already exists!");
           return;
        }else{
          this.exitPage(true);
        }
      }
    )
  }

  setValues(role: string) {
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const surnameInput = document.getElementById('surname') as HTMLInputElement | null;
    const addressInput = document.getElementById('address') as HTMLInputElement | null;
    const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
    const turnOffNotification = document.getElementById('turnNotificationOn') as HTMLInputElement | null;
    const createdNotification = document.getElementById('createdNotification') as HTMLInputElement | null;
    const cancelledNotification = document.getElementById('cancelledNotification') as HTMLInputElement | null;
    const rateMeNotifications = document.getElementById('notificationRateMe') as HTMLInputElement | null;
    const rateAccommodation = document.getElementById('notificationRateAccommodation') as HTMLInputElement | null;

    if(role == "ROLE_Administrator"){
      if (emailInput) emailInput.value = this.admin.email;
      if (nameInput) nameInput.value = this.admin.name;
      if (surnameInput) surnameInput.value = this.admin.surname;
    }else if(role == "ROLE_Guest"){
      if (emailInput) emailInput.value = this.guest.email;
      if (nameInput) nameInput.value = this.guest.name;
      if (surnameInput) surnameInput.value = this.guest.surname;
      if (phoneInput) phoneInput.value = this.guest.phone;
      if (addressInput) addressInput.value = this.guest.address;
      if (turnOffNotification) turnOffNotification.checked = this.guest.turnOnNotification;

    }else{
      if (emailInput) emailInput.value = this.owner.email;
      if (nameInput) nameInput.value = this.owner.name;
      if (surnameInput) surnameInput.value = this.owner.surname;
      if (phoneInput) phoneInput.value = this.owner.phone;
      if (addressInput) addressInput.value = this.owner.address;
      if(createdNotification) createdNotification.checked = this.owner.createdNotification;
      if(cancelledNotification) cancelledNotification.checked = this.owner.cancelledNotification;
      if(rateMeNotifications)rateMeNotifications.checked = this.owner.rateMeNotification;
      if(rateAccommodation) rateAccommodation.checked = this.owner.rateAccommodationNotification;
    }
  }


  changePassword(event: Event) {
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const password2Input = document.getElementById('password2') as HTMLInputElement | null;

    if (
      passwordInput &&
      password2Input &&
      passwordInput?.value !== '' &&
      password2Input?.value !== ''
    ){
      if(passwordInput.value == password2Input.value){
        if (this.admin !== null && this.admin !== undefined) {
          this.userService.changePassword(passwordInput.value, this.admin.id);
        } else if (this.guest !== null && this.guest !== undefined && this.guest.id != null) {
          this.userService.changePassword(passwordInput.value, this.guest.id);
        } else if (this.owner !== null && this.owner !== undefined) {
          this.userService.changePassword(passwordInput.value, this.owner.id);
        } else {}

        this.closePasswordDialog(event)
      }else{
        this.wrongInput();
      }
    }else{
      this.wrongInput();
    }

  }
}
