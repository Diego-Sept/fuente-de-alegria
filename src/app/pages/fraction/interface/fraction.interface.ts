import { Client } from "app/pages/clients/interface/client.interface";

export interface  Fraction {
    id: number;
    name: string;
    clients: Client[];
}

export interface CreateFractionDto {
    name: string;
    clients: Client[];
}