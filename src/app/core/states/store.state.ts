import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from 'app/pages/stores/interface/stores.interface';

@Injectable({
    providedIn: 'root',
})
export class StoreState extends BaseState {

    store = {

        store$: new BehaviorSubject<Store[]>(null),

        loadingGetStores$: new BehaviorSubject<boolean>(false),
        loadingCreationStore$: new BehaviorSubject<boolean>(false),
        loadingUpdatingStore$: new BehaviorSubject<boolean>(false),
        loadingDeletingStore$: new BehaviorSubject<boolean>(false),

    }

    // Categories of Evolutions
    getStores$() {
        return this.store.store$.asObservable();
    }

    getStores(): Store[] {
        return this.store.store$.value;
    }

    setStore(Stores: Store[]) {
        this.store.store$.next(Stores);
    }

    isLoadingGetStores$() {
        return this.store.loadingGetStores$.asObservable();
    }

    setLoadingGetStores(isLoadingGetStores: boolean) {
        this.store.loadingGetStores$.next(isLoadingGetStores);
    }

    // ADD
    isLoadingCreatingStore$() {
        return this.store.loadingCreationStore$.asObservable();
    }

    setLoadingCreatingStore(isLoadingCreatingStore: boolean) {
        this.store.loadingCreationStore$.next(isLoadingCreatingStore);
    }

    isLoadingUpdatingStore$() {
        return this.store.loadingUpdatingStore$.asObservable();
    }

    setLoadingUpdatingStore(loadingUpdatingStore: boolean) {
        this.store.loadingUpdatingStore$.next(loadingUpdatingStore);
    }

    isLoadingDeletingStore$() {
        return this.store.loadingDeletingStore$.asObservable();
    }

    setLoadingDeletingStore(loadingDeletingStore: boolean) {
        this.store.loadingDeletingStore$.next(loadingDeletingStore);
    }

    addStore(store: Store) {
        this.add<Store>({ data: store, storeRefAttribute: this.store.store$ })
    }

    deleteStore(storeId: number) {
        this.delete<Partial<Store[]>>({ dataId: storeId, storeRefAttribute: this.store.store$ });
    }

    updateStore(store: Partial<Store>, entidadId: number) {
        this.update<Partial<Store>>({ data: store, dataId: entidadId, storeRefAttribute: this.store.store$ })
    }

}