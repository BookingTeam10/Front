export interface Message {
  message: string;
}

export interface MessageNotification {
  idOwner:number,
  text: string,
  idGuest:number,
  userRate:string
}
