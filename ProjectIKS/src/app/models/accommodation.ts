import {Owner} from "./users/owner";
import {Reservation, Review} from "./reservation";

export interface Accommodation{
  id: number;
  name: string;
  accepted:boolean,
  automaticActivation:boolean,
  description : string,
  minPeople : number,
  maxPeople : number,
  photos : string[],
  type : TypeAccommodation,
  rating:number,
  cancelDeadline:number,
  prices:Price[],
  takenDates:TakenDate[],
  amenities:Amenity[],
  location:Location,
  owner : Owner,
  reservations : Reservation[],
  weekendPrice:number,
  holidayPrice:number,
  summerPrice:number,
  isNight:boolean,
  accommodationStatus: AccommodationStatus,
  automaticConfirmation: boolean
}


export enum TypeAccommodation {

  Apartment="Apartment",
  Room = "Room"
}

export interface Location{
  id: number,
  country : string,
  city : string,
  street : string,
  number : number
}

export interface TakenDate{
  firstDate : Date,
  endDate : Date
}

export interface Amenity{
  name : string,
}

export interface Price{
  startDate: any,
  endDate: any,
  price: any
}

export enum AccommodationStatus {
  CREATED= 'CREATED',
  EDITED = 'EDITED',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

