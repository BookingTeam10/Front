export interface User {
  name: string;
  surname: string;
  phone: string;
  address: string;
}


export interface Admin{
    id: number;
    email: string;
    password: string;
    name: string;
    surname:string;
}

export interface User {
  name: string;
  surname: string;
  phone: string;
  address: string;
  token? : string;
}
