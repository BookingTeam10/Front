import {Accommodation} from "./accommodation";
import {Guest} from "./users/guest";

export interface Reservation {
  id: number;
  totalPrice: number;
  status: ReservationStatus;
  startDate: Date;
  endDate: Date;
  numberOfNights: number;
  accommodation: Accommodation;
  guest: Guest;
  reviews: Review[];
}

export enum ReservationStatus {
  ACCEPTED = "ACCEPTED"  ,
  CANCELLED  = "CANCELLED " ,
  WAITING  = "WAITING" ,
  REJECTED  = "REJECTED" ,
  DELETED  = "DELETED"
}

export interface Review {
  id: number;
  rate: number;
  comment: string;
  status: ReviewStatus;
  reservation: Reservation;
}

export interface Review1 {
  id: number;
  rate: number;
  comment: string;
  status: ReviewStatus;
  reservation: number;
}

export interface ReviewBigger {
  id: number;
  rate: number;
  comment: string;
  status: ReviewStatus;
  commentDate:string
}


export enum ReviewStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  REPORTED = "REPORTED",
  WAITING = "WAITING"
}

export interface Report {
  accommodation:Accommodation;
  numberReservation:number;
  profit:number;
}
export interface ReportAccommodation {
  accommodation: Accommodation;
  map: { [key: number]: number[] };
}
