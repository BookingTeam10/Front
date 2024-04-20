import {Component, Injectable, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {Login} from "../../../models/login";
import {AuthResponse} from "../../../models/auth-response";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {MessageNotification} from "../../../models/message";

import {environment} from "../../../environment/environment";
import {UserServiceService} from "../../unregistered-user/signup/user-service.service";
import {CertificateService} from "./service/certificate.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{


  role: string;
  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  private webSocket: WebSocket;
  certificates: any[];

  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  ngOnInit(): void {
    //this.initializeWebSocketConnection();
    //this.getCertificates();
  }


  constructor(private service:LoginService,private userService:UserServiceService,private router: Router,private certificateService:CertificateService) {
  }

  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  loginClicked(): void {
    const loginData = {
      email: this.loginForm.value.email || "",
      password: this.loginForm.value.password || ""
    }
    this.service.loginSuperAdmin(loginData).subscribe({
      next: async (response: AuthResponse) => {
        if(response){
          this.router.navigate(['/super-admin/home']);
          return;
        }

      }});


    this.service.login(loginData).subscribe({
      //srediti ovo seljacku varijantu
      next: async (response: AuthResponse) => {
        if(this.loginForm.value.email=="popovicluka65@gmail.com" && this.loginForm.value.password=="ftn"){
           console.log("AAAAA");
           this.router.navigate(['/super-admin/home']);
           return;
         }
        if (response.jwt === "NEUSPESNO") {
          this.router.navigate(['/users/login']);
          setTimeout(() => { alert("Wrong credentials") })
        } else {
          localStorage.setItem('User', response.jwt);
          this.service.setUser();

          this.service.isBlocked().subscribe((blocked) => {
            if (blocked) {

              setTimeout(() => { alert('User is blocked!') })
              this.router.navigate(['/users/login']);
              return;
            }
          });

          if (this.loginForm.value.email != null) {
            //this.openGlobalSocket(this.loginForm.value.email);
            //this.openSocket(this.loginForm.value.email);
          }

          // Navigate based on the user role
          this.service.userState.subscribe((role: string) => {
            this.role = role;
            console.log("ULOGOVAN");
            console.log(this.service.getUsername());

           //  this.certificateService.getCertificates(this.service.getUsername())
           //    .subscribe(
           //      (response) => {
           //        this.certificates = response;
           //      },
           //      (error) => {
           //        console.error('Error fetching certificates:', error);
           //      }
           //    );
           //
           // console.log("UCITANI");
           // console.log(this.certificates);

            this.certificateService.getCertificateByEmail(this.service.getUsername())
              .subscribe(
                (response: HttpResponse<Blob>) => {
                  if (response && response.body) {
                    const contentDisposition: string | null = response.headers.get('content-disposition');
                    if (contentDisposition) {
                      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                      const matches = filenameRegex.exec(contentDisposition);
                      const filename = matches && matches.length > 1 ? matches[1].replace(/['"]/g, '') : 'certificate.p12';

                      // Creating object URL from blob and creating anchor element to trigger download
                      const blob = new Blob([response.body], { type: 'application/octet-stream' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = filename;
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                    } else {
                      console.error('Content-Disposition header not found in response.');
                    }
                  } else {
                    console.error('Response body is null or undefined.');
                  }
                },
                (error) => {
                  console.error('Error downloading certificate:', error);
                }
              );

            if (this.role === 'ROLE_Administrator') {
              this.router.navigate(['/admin/accommodations']);
            } else if (this.role === 'ROLE_Owner') {
              this.router.navigate(['/owners/accommodations']);
            } else if (this.role === 'ROLE_Guest') {
              this.router.navigate(['/guests/accommodations'])
            }
          });
        }
      }
    });
  }


  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  // openSocket(email:string) {
  //   console.log("UDJE")
  //   this.isCustomSocketOpened = true;
  //   console.log("A")
  //   console.log(this.stompClient)
  //   console.log(environment.apiHost)
  //   this.service.sub(email,message).subscribe((messageNotification: MessageNotification) => {
  //     console.log(messageNotification);
  //   });
  //   // this.stompClient.subscribe("/socket-publisher/" + email, (message: { body: string; }) => {
  //   //   this.handleResult(message);
  //   // });
  // }

  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: MessageNotification = JSON.parse(message.body);
      //this.messages.push(messageResult);
    }}


  registerClicked() {
    this.router.navigate(['/register'])
  }

}
