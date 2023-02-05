export interface Client {
  id?: number;
  name: string;
  surname: string;
  identificationNumber: string;
  contacts: Contact[];
  guestsQuantity: number;
  user?: User;
}

export interface Contact {
  id?: number;
  email: string;
  phone: string;
  mainContact: boolean;
}

export interface User {
    id?: number;
    username: string;
    password: string;
    role: Role;
}

export interface Role{
    id?: number;
    name: string;
}