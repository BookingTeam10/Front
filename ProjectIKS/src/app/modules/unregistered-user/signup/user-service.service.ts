import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, EMPTY, firstValueFrom, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../environment/environment";

import {Admin} from "../../../models/users/user";
import {Owner} from "../../../models/users/owner";
import {Guest} from "../../../models/users/guest";
import {AuthResponse} from "../../../models/auth-response";
import {Message} from "../../../models/message";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });


  // private cors_headers  = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer ' +   // Replace authToken with the actual token
  // });

  constructor(private httpClient: HttpClient,private router: Router) { }

  // activate(code: string): Observable<string> {
  //   console.log(code);
  //   console.log(environment.apiHost)
  //   return this.httpClient.post<string>(environment.apiHost+ '/activate/'+ code,{
  //     headers: this.headers,
  //   });
  // }

  activate(code: string): Observable<string> {
    this.router.navigate(['/users/login']);
    return this.httpClient.post<string>(
      `${environment.apiHost}/activate/${code}`,
      {
        headers: this.headers, responseType: 'text'
      }
    );
  }

  getAdmin(username: string): Observable<Admin> {
    return this.httpClient.get<Admin>(environment.apiHost + '/admin/username/' + username);
  }

  getGuest(username: string): Observable<Guest> {
    return this.httpClient.get<Guest>(environment.apiHost + '/guests/username/' + username);
  }

  getOwner(username: string): Observable<Owner> {
    return this.httpClient.get<Owner>(environment.apiHost + '/owners/username/' + username);
  }

   update(admin: Admin | null, guest: Guest | null, owner: Owner | null, oldUsername: string): Observable<boolean> {
    if (admin !== null && admin !== undefined) {
      if (admin.email != oldUsername) {
        return this.checkUsername(admin.email).pipe(
          map((usernameExists) => {
              if(usernameExists){return true;}
              else{
                this.updateAdmin(admin).subscribe((response: any) => {});
                return false;
              }
          })
        )
      }else {
        this.updateAdmin(admin).subscribe((response: any) => {
        });
      }
    } else if (guest !== null && guest !== undefined) {
      if (guest.email != oldUsername) {
        return this.checkUsername(guest.email).pipe(
          map((usernameExists) =>{
            if(usernameExists){return true;}
            else{
              this.updateGuest(guest).subscribe((response: any) => {});
              return false;
            }
          })
        );
      }else {
        this.updateGuest(guest).subscribe((response: any) => {
        });
      }
    } else if (owner !== null && owner !== undefined) {
      if (owner.email != oldUsername) {
          this.checkUsername(owner.email).pipe(
            map((usernameExists) =>{
              if(usernameExists){return true;}
              else{
                this.updateOwner(owner).subscribe((response: any) => {});
                return false;
              }

            })
          );

      }else {
        this.updateOwner(owner).subscribe((response: any) => {
        });
      }
    } else {
    }

    return of(false);
  }

  private updateAdmin(admin: Admin) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Admin>(environment.apiHost + '/admin/' + admin.id, admin,{headers: headers});
  }

  private updateGuest(guest: Guest) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Guest>(environment.apiHost + '/guests/' + guest.id, guest, {headers: headers});

  }

  private updateOwner(owner: Owner) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Owner>(environment.apiHost + '/owners/' + owner.id, owner, {headers: headers});
  }

  delete(admin: Admin | null, guest: Guest | null, owner: Owner | null) {

    if (admin !== null && admin !== undefined) {
      this.deleteAdmin(admin).subscribe((response: any) => {
      });
    } else if (guest !== null && guest !== undefined) {
      this.deleteGuest(guest).subscribe((response: any) => {
      });

    } else if (owner !== null && owner !== undefined) {
      this.deleteOwner(owner).subscribe((response: any) => {
      });
    } else {
    }
  }

  private deleteAdmin(admin: Admin) {
    return this.httpClient.delete(environment.apiHost + '/admin/' + admin.id);
  }

  private deleteGuest(guest: Guest) {
    return this.httpClient.delete(environment.apiHost + '/guests/' + guest.id);
  }

  private deleteOwner(owner: Owner) {
    return this.httpClient.delete(environment.apiHost + '/owners/' + owner.id);
  }

  changePassword(pass: string, id: number) {
    const passwordDto = {
      password: pass
    };
    return this.httpClient.put(environment.apiHost + '/users/change-password/' + id, passwordDto).subscribe((response: any) => {
    });
  }

  checkUsername(email: string) {
    return this.httpClient.get<boolean>(environment.apiHost + "/users/exists/" + email)
  }

  getOwnerById(idOwner: number):Observable<Owner> {
    return this.httpClient.get<Owner>(environment.apiHost + '/owners/full/' + idOwner);
  }
}
