export interface Registration {
  id:number,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
  address: string,
  userType: TypeUser,
  activationCode:string
}

export interface RegistrationWithoutActivateCode {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
  address: string,
  userType: TypeUser,
}

export enum TypeUser {
  OWNER="OWNER" ,
  GUEST="GUEST"
}
