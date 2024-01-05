import {Accommodation} from "../accommodation";

export interface Guest {
  id?: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  address: string;
  blocked: boolean;
  numberCanceledReservation: number;
  turnOnNotification: boolean;
  reported: boolean;
  favouriteAccommodations : Accommodation[];
}
