import { Injectable } from '@angular/core';
import { Client } from 'app/pages/clients/interface/client.interface';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClientService } from '../services/client.service';
import { ClientState } from '../states/client.state';
import { ClientDto } from '../../pages/clients/interface/client.interface';

@Injectable({
    providedIn: 'root',
})
export class ClientFacade {

    constructor(
        private clientState: ClientState,
        private clientService: ClientService
    ) { }

    // LOAD
    loadClients(qps?) {

        this.clientState.setLoadingGetClients(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.clientService.getClients(qps).pipe(
                finalize(() => this.clientState.setLoadingGetClients(false))
            ).subscribe(
                // Success
                response => {
                    this.clientState.setClients(response)
                },
                // Error
                (e) => {
                    this.clientState.setLoadingGetClients(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getClients() : Observable<Client[]>{
        return this.clientState.getClients$();
    }

    getClientsValue() : Client[]{
        return this.clientState.getClients();
    }

    // ADD - CREATE
    addClient(client: ClientDto): any | Observable<Client> {
        this.clientState.setLoadingCreatingClient(true);

        const promise: Promise<Client> = new Promise((res, rej) => {
            this.clientService.postClient(client).pipe(
                finalize(() => this.clientState.setLoadingCreatingClient(false))
            ).subscribe(
                // Add al store
                (client) => { this.clientState.addClient(client); res(client) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteClient(id: number) {
        this.clientState.setLoadingDeletingClient(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.clientService.deleteClient(id).pipe(
                finalize(() => this.clientState.setLoadingDeletingClient(false))
            ).subscribe(
                (response) => { 
                    this.clientState.deleteClient(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateClient(id: number, client: ClientDto): Observable<Client> {
        this.clientState.setLoadingUpdatingClient(true);

        const promise: Promise<Client> = new Promise((res, rej) => {
            this.clientService.patchClient(id, client).pipe(
                finalize(() => this.clientState.setLoadingUpdatingClient(false))
            ).subscribe(
                (client) => { this.clientState.updateClient(client, client.id); res(client) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getClientById(id: number) {
        return this.getClientsValue().find(client => client.id == id);
    }


}