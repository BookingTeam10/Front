import {Owner} from "./users/owner";

// export interface Accommodation{
//   id: number,
//   name:string,
//   description : string,
//   minPeople : number,
//   maxPeople : number,
//   ammineity: string,
//   rating : number,
//   weekendPrice:number,
//   holidayPrice:number,
//   summerPrice:number,
//   limit:number,
//   UserType : string,
//   ConfirmationType: string,
//   TypeAcc:string,
//   dataSource?:any[],
//   imageUrls?:string[],
//   owner:Owner,
//   location:Location
// }
//
// export interface Location{
//   country : string,
//   city : string,
//   street : string,
//   number : number
// }

export interface Accommodation {
  id: number;
  accepted: boolean;
  automaticActivation: boolean;
  description: string;
  minPeople: number;
  maxPeople: number;
  photo: string;
  typeAccomodation: TypeAccommodation;
  rating: number;
  cancelDeadline: number;
  prices: Price[];
  takenDates: TakenDate[];
  amenities: Amenity[];
  location: Location | null;
  owner: Owner;
  reservations?: Reservation[];
}

export enum TypeAccommodation {
  Apartment = 'Apartment',
  Room = 'Room'
}

export interface Price {
  price: number;
  beginDate: string;
}

export interface TakenDate {
  firstDate: string;
  lastDate: string;
}

export interface Amenity {
  name: string;
}

export interface Reservation {
}

export interface Location {
  country: string;
  city: string;
  street: string;
  number: number;
}
