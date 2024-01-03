export interface ReviewOwner {
  id: number;
  rate: number;
  comment:string,
  statusReview:Status
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

export enum Status {
  ACTIVE= 'ACTIVE',
  REPORTED='REPORTED'
}
