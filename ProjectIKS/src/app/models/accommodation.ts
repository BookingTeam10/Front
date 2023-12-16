import {Owner} from "./users/owner";
import {Reservation, Review} from "./reservation";

export interface Accommodation{
  id: number;
  name: string;
  accepted:boolean,     //dodati ID ako ne radi
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
  isNight:boolean
}
export enum TypeAccommodation {
  Apartment="Apartment",
  Room = "Room"
}

export interface Location{
  country : string,
  city : string,
  street : string,
  number : number
}

export interface TakenDate{
  firstDate : Date,
  lastDate : Date
}

export interface Amenity{
  name : string,
}

export interface Price{
  price : number,
  beginDate : Date
}

export enum AccommodationStatus {
  CREATED,
  EDITED,
  REJECTED,
  APPROVED
}
