export interface Client {
  id?: number;
  name: string;
  surname: string;
  identificationNumber: string;
  contacts?: Contact[];
  guestsQuantity: number;
  user?: User;
  address: string;
}

export interface Contact {
  id?: number;
  name: string;
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

export interface CreateClientDto {
  name: string;
  surname: string;
  identificationNumber: string;
  guestsQuantity: number;
  address: string;
}

export interface ClientDto{
  clientData: CreateClientDto;
  contacts: Contact[];
  roleId: number;
}