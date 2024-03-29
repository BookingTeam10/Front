import {Guest} from "./users/guest";
import {Owner} from "./users/owner";
import {ReviewStatus} from "./reservation";

export interface ReviewOwner {
  id: number;
  rate: number;
  comment:string,
  statusReview:Status
}

export interface ReviewOwnerExtended {
  id: number;
  rate: number;
  comment:string,
  commentDate:string,
  status:Status,
  owner: Owner,
  guest:Guest,
  isReported:boolean
}

export interface AddReviewOwner {
  id: number;
  rate: number;
  comment:string,
  commentDate:string,
  statusReview:Status,
  idOwner:number,
  idGuest:number,
  isReported:boolean
}

export interface ReportUser {
  id: number;
  comment:string,
  statusReview:Status,
  userReportUser:string
}

export enum Status {
  ACTIVE= 'ACTIVE',
  REPORTED='REPORTED',
  WAITING = 'WAITING',
  DELETED = 'DELETED'
}

export interface  ReportUserExtended{
  id: number;
  comment: string;
  status: ReviewStatus;
  owner: Owner;
  guest: Guest;
  userReportUser: string;
}
