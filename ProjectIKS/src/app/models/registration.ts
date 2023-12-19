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

export enum TypeUser {
  Owner = 'Owner',
  Guest = 'Guest'
}
