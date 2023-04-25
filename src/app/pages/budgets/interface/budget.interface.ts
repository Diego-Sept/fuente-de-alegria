import { Fraction } from "app/pages/fraction/interface/fraction.interface";
import { Client } from 'app/pages/clients/interface/client.interface';
import { EventType } from '../../event-types/interfaces/eventTypes.interface';
import { Saloon } from "app/pages/saloons/interfaces/saloons.interface";

export interface Budget {
    id?: number;
    title: string;
    stateId: number;
    clientId: number;
    client: Client;
    fractionId: number;
    fraction: Fraction;
    amount: number;
    saloonId: number;
    saloon: Saloon;
    eventTypeId: number;
    eventType: EventType;
}

export interface CreateBudgetDto {
    stateId: number;
    title: string;
    client: Client;
    fraction: Fraction;
    amount: number;
    saloon: Saloon;
    eventType: EventType;
    observations: string;
    startDate: Date;
    endDate: Date;
  }

  export enum EventStates {
    BUDGETED = "Presupuestado",
    PENDING = "Pendiente",
    CONFIRMED = "Confirmado",
    REJECTED = "Rechazado",
}