export interface Owner {
  id:number,
  name: string;
  surname: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  createdNotification: boolean;
  rateMeNotification: boolean;
  cancelledNotification: boolean;
  rateAccommodationNotification: boolean;
}
