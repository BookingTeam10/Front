import { Observable, of } from 'rxjs';
import {Admin} from "../../../../models/users/user";
import {Guest} from "../../../../models/users/guest";
import {Owner} from "../../../../models/users/owner";


export class MockUserServiceService {
  // Add more methods if needed
  getAdmin(username: string): Observable<Admin> {
    return of({
      email: 'mockAdmin@example.com',
      name: 'Mock',
      surname: 'Admin',
      password: 'mockPassword',
      id: 1
    });
  }

  getGuest(username: string): Observable<Guest> {
    return of({
      id: 3,
      numberCanceledReservation :0,
      password:"abc",
      blocked: false,
      reported: false,
      favouriteAccommodations: [],
      email: 'mockGuest@example.com',
      name: 'Mock',
      surname: 'Guest',
      phone: '123456789',
      address: 'Mock Street',
      turnOnNotification: true
    });
  }

  getOwner(username: string): Observable<Owner> {
    return of({
      email: 'mockOwner@example.com',
      id: 1,
      password: "abc",
      rateMeNotification: false,
      rateAccommodationNotification: false,
      name: 'Mock',
      surname: 'Owner',
      phone: '987654321',
      address: 'Mock Avenue',
      createdNotification: true,
      cancelledNotification: false,
      notificationRateMe: true,
      notificationRateAccommodation: false
    });
  }

  // Add more methods if needed
}
