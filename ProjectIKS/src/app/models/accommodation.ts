import {Owner} from "./users/owner";
import {Reservation, Review} from "./reservation";

export interface Accommodation{
    id: number,
    description : string,
    minPeople : number,
    maxPeople : number,
    photoes : string[],
    rating : number,
    type : TypeAccommodation,
    owner : Owner,
    location:Location,
    reservations : Reservation[],
    amenities:Amenity[]
}
enum TypeAccommodation {
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
  lastDate : Date
}

export interface Amenity{
  name : string,
}
