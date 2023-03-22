import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StoreState } from '../states/store.state';
import { StoresService } from '../services/stores.service';
import { Store, StoreDto } from 'app/pages/stores/interface/stores.interface';



@Injectable({
    providedIn: 'root',
})
export class StoreFacade {

    constructor(
        private storeState: StoreState,
        private storeService: StoresService
    ) { }

    // LOAD
    loadStores(qps?) {

        this.storeState.setLoadingGetStores(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.storeService.getStores(qps).pipe(
                finalize(() => this.storeState.setLoadingGetStores(false))
            ).subscribe(
                // Success
                response => {
                    this.storeState.setStore(response)
                },
                // Error
                (e) => {
                    this.storeState.setLoadingGetStores(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getStores() : Observable<Store[]>{
        return this.storeState.getStores$();
    }

    getStoresValue() : Store[]{
        return this.storeState.getStores();
    }

    // ADD - CREATE
    addStore(store: StoreDto): any | Observable<Store> {
        this.storeState.setLoadingCreatingStore(true);

        const promise: Promise<Store> = new Promise((res, rej) => {
            this.storeService.postStore(store).pipe(
                finalize(() => this.storeState.setLoadingCreatingStore(false))
            ).subscribe(
                // Add al store
                (store) => { this.storeState.addStore(store); res(store) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteStore(id: number) {
        this.storeState.setLoadingDeletingStore(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.storeService.deleteStore(id).pipe(
                finalize(() => this.storeState.setLoadingDeletingStore(false))
            ).subscribe(
                (response) => { 
                    this.storeState.deleteStore(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateStore(id: number, client: StoreDto): Observable<Store> {
        this.storeState.setLoadingUpdatingStore(true);

        const promise: Promise<Store> = new Promise((res, rej) => {
            this.storeService.patchStore(id, client).pipe(
                finalize(() => this.storeState.setLoadingUpdatingStore(false))
            ).subscribe(
                (client) => { this.storeState.updateStore(client, client.id); res(client) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getStoreById(id: number) {
        return this.getStoresValue().find(store => store.id == id);
    }


}