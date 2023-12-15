import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from "../../service/owner.service";
import { Owner } from "../../../../models/users/owner";

@Component({
  selector: 'app-edit-profile-owner',
  templateUrl: './edit-profile-owner.component.html',
  styleUrls: ['./edit-profile-owner.component.css']
})
export class EditProfileOwnerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService
  ) {}

  owner: Owner;

  openDeleteDialog(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (isConfirmed) {
      this.deleteOwner();
    }
  }

  onSubmit(): void {
    const isConfirmed = window.confirm('Are you sure you want to apply changes to this item?');

    if (isConfirmed) {
      if(!this.getValues()){return;}
      this.updateOwner();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['ownerId'];
      this.ownerService.getOwner(id).subscribe({
        next: (data: Owner) => {
          this.owner = data;
          this.setValues();
        }
      });
    });
  }

   getValues(): boolean {
     const emailInput = document.getElementById('email') as HTMLInputElement | null;
     const passwordInput = document.getElementById('password') as HTMLInputElement | null;
     const password2Input = document.getElementById('password2') as HTMLInputElement | null;
     const nameInput = document.getElementById('name') as HTMLInputElement | null;
     const surnameInput = document.getElementById('surname') as HTMLInputElement | null;


     if (emailInput && passwordInput && password2Input && nameInput && surnameInput &&
       emailInput?.value !== '' &&
       passwordInput?.value !== '' &&
       password2Input?.value !== '' &&
       nameInput?.value !== '' &&
       surnameInput?.value !== '')
      {
       if (passwordInput.value !== password2Input.value) {
         this.wrongInput();
         return false;
       }

       this.owner.email = emailInput?.value;
       this.owner.password = passwordInput?.value;
       this.owner.name = nameInput?.value;
       this.owner.surname = surnameInput?.value;

     } else {
       this.wrongInput();
       return  false;
     }

     return true;

  }

  wrongInput(errorMessage: string = "Wrong entries. Please check your input values."): void {
    alert(errorMessage);
  }

  private deleteOwner(): void {
    this.ownerService.delete(this.owner.id);
    this.router.navigate(['']);
  }

  private updateOwner(): void {
    this.ownerService.update(this.owner);
    this.router.navigate(['']);

  }

  setValues() {
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const password2Input = document.getElementById('password2') as HTMLInputElement | null;
    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const surnameInput = document.getElementById('surname') as HTMLInputElement | null;

    if (emailInput) emailInput.value = this.owner.email;
    if (passwordInput) passwordInput.value = this.owner.password;
    if (password2Input) password2Input.value = this.owner.password;
    if (nameInput) nameInput.value = this.owner.name;
    if (surnameInput) surnameInput.value = this.owner.surname;

  }
}
