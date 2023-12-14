import {Accommodation} from "./accommodation";
import {Guest} from "./users/guest";

export interface Reservation {
  id?: number;
  totalPrice: number;
  status: ReservationStatus;
  startDate: Date  | null;
  endDate: Date  | null;
  numberOfNights: number;
  accommodation: Accommodation | null;
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

enum ReviewStatus {
  ACTIVE,
  DELETED,
  REPORTED
}
