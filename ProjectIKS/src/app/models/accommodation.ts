import {Owner} from "./users/owner";

export interface Accommodation{
    id: number,
    description : string,
    minPeople : number,
    maxPeople : number,
    photo : string,
    rating : number,
    type : TypeAccommodation
    owner:Owner,
    location:Location
}
enum TypeAccommodation {
  Apartment = "Apartment",
  Room = "Room"
}

export interface Location{
  id: number,
  country : string,
  city : string,
  street : string,
  number : number
}

