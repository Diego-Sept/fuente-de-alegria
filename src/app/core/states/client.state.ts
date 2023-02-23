import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'app/pages/clients/interface/client.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ClientState extends BaseState {

    store = {

        client$: new BehaviorSubject<Client[]>(null),

        loadingGetClients$: new BehaviorSubject<boolean>(false),
        loadingCreationClient$: new BehaviorSubject<boolean>(false),
        loadingUpdatingClient$: new BehaviorSubject<boolean>(false),
        loadingDeletingClient$: new BehaviorSubject<boolean>(false),

    }

    // Categories of Evolutions
    getClients$() {
        return this.store.client$.asObservable();
    }

    setClients(clients: Client[]) {
        this.store.client$.next(clients);
    }

    isLoadingGetClients$() {
        return this.store.loadingGetClients$.asObservable();
    }

    setLoadingGetClients(isLoadingGetClients: boolean) {
        this.store.loadingGetClients$.next(isLoadingGetClients);
    }

    // ADD
    isLoadingCreatingClient$() {
        return this.store.loadingCreationClient$.asObservable();
    }

    setLoadingCreatingClient(isLoadingCreatingClients: boolean) {
        this.store.loadingCreationClient$.next(isLoadingCreatingClients);
    }

    isLoadingUpdatingClient$() {
        return this.store.loadingUpdatingClient$.asObservable();
    }

    setLoadingUpdatingClient(loadingUpdatingClient: boolean) {
        this.store.loadingUpdatingClient$.next(loadingUpdatingClient);
    }

    isLoadingDeletingClient$() {
        return this.store.loadingDeletingClient$.asObservable();
    }

    setLoadingDeletingClient(loadingDeletingClient: boolean) {
        this.store.loadingDeletingClient$.next(loadingDeletingClient);
    }

    addClient(client: Client) {
        this.add<Client>({ data: client, storeRefAttribute: this.store.client$ })
    }

    deleteClient(clientId: number) {
        this.delete<Partial<Client[]>>({ dataId: clientId, storeRefAttribute: this.store.client$ });
    }

}