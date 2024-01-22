import {Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
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
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private router: Router,
    public ngZone: NgZone,
    public loginService: LoginService,
    public userService: UserServiceService,
    private formBuilder: FormBuilder
  ) { }

  owner: Owner;
  admin: Admin;
  guest: Guest;
  showPasswordChangeForm = false;
  oldUsername = "";
  allTextPattern = "[a-zA-ZčćžšđČĆŽŠĐ][a-zA-ZčćžšđČĆŽŠĐ]*"
  phoneNumberPattern = "[0-9 +]?[0-9]+[0-9 \\-]+";

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.allTextPattern),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern(this.allTextPattern),
        ],
      ],
      address: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(this.phoneNumberPattern),
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      createdNotification: [false],
      cancelledNotification: [false],
      notificationRateMe: [false],
      notificationRateAccommodation: [false],
      turnNotificationOn: [false],
      password: ['', [Validators.minLength(3)]],
      confirmPassword: [''],
    }, {
      validators: this.passwordMatchValidator,
    });

    this.loadInitialValues();
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };


  loadInitialValues(): void {
    if (this.loginService.getRole() === 'ROLE_Administrator') {
      this.userService.getAdmin(this.loginService.getUsername()).subscribe(
        (admin: Admin) => {
          this.admin = admin;
          this.oldUsername = admin.email;
          this.setFormValues();
        }
      );
    } else if (this.loginService.getRole() === 'ROLE_Guest') {
      this.userService.getGuest(this.loginService.getUsername()).subscribe(
        (guest: Guest) => {
          this.guest = guest;
          this.oldUsername = guest.email;
          this.setFormValues();
        }
      );
    } else if (this.loginService.getRole() === 'ROLE_Owner')
      this.userService.getOwner(this.loginService.getUsername()).subscribe(
        (owner: Owner) => {
          this.owner = owner;
          this.oldUsername = owner.email;
          this.setFormValues();
        }
      );
    else {

    }
  }

  setFormValues(): void {
    if (this.loginService.getRole() === 'ROLE_Administrator') {
      this.profileForm.patchValue({
        email: this.admin.email,
        name: this.admin.name,
        surname: this.admin.surname,
      });
    } else if (this.loginService.getRole() === 'ROLE_Guest') {
      this.profileForm.patchValue({
        email: this.guest.email,
        name: this.guest.name,
        surname: this.guest.surname,
        phone: this.guest.phone,
        address: this.guest.address,
        turnNotificationOn: this.guest.turnOnNotification,
      });
    } else if (this.loginService.getRole() === 'ROLE_Owner') {
      this.profileForm.patchValue({
        email: this.owner.email,
        name: this.owner.name,
        surname: this.owner.surname,
        phone: this.owner.phone,
        address: this.owner.address,
        createdNotification: this.owner.createdNotification,
        cancelledNotification: this.owner.cancelledNotification,
        notificationRateMe: this.owner.rateMeNotification,
        notificationRateAccommodation: this.owner.rateAccommodationNotification,

      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      if (!this.getValues(this.loginService.getRole())) { return; }
      this.updateProfile();
    } else {
      alert('Please check the form for errors.');
    }
  }

  getValues(role: string): boolean {
    let isValid = true;

    if (role === 'ROLE_Administrator') {
      const emailControl = this.profileForm.get('email');
      const nameControl = this.profileForm.get('name');
      const surnameControl = this.profileForm.get('surname');

      if (!emailControl || !nameControl || !surnameControl ||
        emailControl.value === null || nameControl.value === null || surnameControl.value === null) {
        return false;
      }

      this.admin.email = emailControl.value;
      this.admin.name = nameControl.value;
      this.admin.surname = surnameControl.value;


    } else if (role === 'ROLE_Guest') {
      const emailControl = this.profileForm.get('email');
      const nameControl = this.profileForm.get('name');
      const surnameControl = this.profileForm.get('surname');
      const phoneControl = this.profileForm.get('phone');
      const addressControl = this.profileForm.get('address');
      const notificationTurnOnControl = this.profileForm.get("turnNotificationOn")

      if (!emailControl || !nameControl || !surnameControl || !phoneControl || !addressControl || !notificationTurnOnControl ||
        emailControl.value === null || nameControl.value === null || surnameControl.value === null ||
        phoneControl.value === null || addressControl.value === null || notificationTurnOnControl.value === null) {
        return false;
      }

      this.guest.email = emailControl.value;
      this.guest.name = nameControl.value;
      this.guest.surname = surnameControl.value;
      this.guest.phone = phoneControl.value;
      this.guest.address = addressControl.value;
      this.guest.turnOnNotification  = notificationTurnOnControl.value;

    } else if (role === 'ROLE_Owner') {
      const emailControl = this.profileForm.get('email');
      const nameControl = this.profileForm.get('name');
      const surnameControl = this.profileForm.get('surname');
      const phoneControl = this.profileForm.get('phone');
      const addressControl = this.profileForm.get('address');
      const createdNotificationControl = this.profileForm.get('createdNotification');
      const cancelledNotificationControl = this.profileForm.get('cancelledNotification');
      const notificationRateMeControl = this.profileForm.get('notificationRateMe');
      const notificationRateAccommodationControl = this.profileForm.get('notificationRateAccommodation');

      if (!emailControl || !nameControl || !surnameControl || !phoneControl || !addressControl ||
        !createdNotificationControl || !cancelledNotificationControl || !notificationRateMeControl ||
        !notificationRateAccommodationControl ||
        emailControl.value === null || nameControl.value === null || surnameControl.value === null ||
        phoneControl.value === null || addressControl.value === null ||
        createdNotificationControl.value === null || cancelledNotificationControl.value === null ||
        notificationRateMeControl.value === null || notificationRateAccommodationControl.value === null) {
        return false;
      }

      this.owner.email = emailControl.value;
      this.owner.name = nameControl.value;
      this.owner.surname = surnameControl.value;
      this.owner.phone = phoneControl.value;
      this.owner.address = addressControl.value;
      this.owner.createdNotification = createdNotificationControl.value;
      this.owner.rateMeNotification = notificationRateMeControl.value;
      this.owner.rateAccommodationNotification = notificationRateAccommodationControl.value;
      this.owner.cancelledNotification = cancelledNotificationControl.value;

    }

    return true;
  }



  async updateProfile(): Promise<void> {
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

  exitPage(leave: boolean) {
    let url = 'accommodations';

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

  wrongInput(errorMessage: string = "Wrong entries. Please check your input values."): void {
    alert(errorMessage);
  }

  private deleteProfile(): void {
    this.userService.delete(this.admin, this.guest, this.owner);
    this.exitPage(true);
  }
  openCancelDialog() {
    const isConfirmed = window.confirm('Are you sure you want to cancel changes to this item?');

    if (isConfirmed) {
      this.exitPage(false);
    }
  }

  get password() {
    return this.profileForm.get('password');
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }

  changePassword(event: Event) {
    // Accessing password values
    const newPassword = this.profileForm.get('password')!.value;
    const confirmPassword = this.profileForm.get('confirmPassword')!.value;

    //
    // if (
    //   passwordControl &&
    //   confirmPasswordControl &&
    //   passwordControl.value !== null &&
    //   passwordControl.value !== undefined &&
    //   confirmPasswordControl.value !== null &&
    //   confirmPasswordControl.value !== undefined
    // ) {
    //   if (passwordControl.value === confirmPasswordControl.value) {
    //     if (this.admin !== null && this.admin !== undefined) {
    //       this.userService.changePassword(passwordControl.value, this.admin.id);
    //     } else if (this.guest !== null && this.guest !== undefined && this.guest.id !== null) {
    //       this.userService.changePassword(passwordControl.value, this.guest.id);
    //     } else if (this.owner !== null && this.owner !== undefined) {
    //       this.userService.changePassword(passwordControl.value, this.owner.id);
    //     } else {
    //
    //     }
    //
    //     this.closePasswordDialog(event);
    //   } else {
    //     confirmPasswordControl.setErrors({ 'passwordMismatch': true });
    //   }
    // } else {
    //   confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    // }
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
    this.setFormValues();
  }


  openChangePasswordDialog(event: Event) {
    event.preventDefault();
    this.showPasswordChangeForm = true;
  }

  openDeleteDialog(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (isConfirmed) {
      this.deleteProfile();
    }
  }

}


