import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Saloon } from 'app/pages/saloons/interfaces/saloons.interface';


@Injectable({
    providedIn: 'root',
})
export class SaloonState extends BaseState {

    store = {

        saloon$: new BehaviorSubject<Saloon[]>(null),

        loadingGetSaloon$: new BehaviorSubject<boolean>(false),
        loadingCreationSaloon$: new BehaviorSubject<boolean>(false),
        loadingUpdatingSaloon$: new BehaviorSubject<boolean>(false),
        loadingDeletingSaloon$: new BehaviorSubject<boolean>(false),

    }

    // Categories of Evolutions
    getSaloon$() {
        return this.store.saloon$.asObservable();
    }

    getSaloon(): Saloon[] {
        return this.store.saloon$.value;
    }

    setSaloon(saloon: Saloon[]) {
        this.store.saloon$.next(saloon);
    }

    isLoadingGetSaloon$() {
        return this.store.loadingGetSaloon$.asObservable();
    }

    setLoadingGetSaloon(isLoadingGetSaloon: boolean) {
        this.store.loadingGetSaloon$.next(isLoadingGetSaloon);
    }

    // ADD
    isLoadingCreatingSaloon$() {
        return this.store.loadingCreationSaloon$.asObservable();
    }

    setLoadingCreatingSaloon(isLoadingCreatingSaloon: boolean) {
        this.store.loadingCreationSaloon$.next(isLoadingCreatingSaloon);
    }

    isLoadingUpdatingSaloon$() {
        return this.store.loadingUpdatingSaloon$.asObservable();
    }

    setLoadingUpdatingSaloon(loadingUpdatingSaloon: boolean) {
        this.store.loadingUpdatingSaloon$.next(loadingUpdatingSaloon);
    }

    isLoadingDeletingSaloon$() {
        return this.store.loadingDeletingSaloon$.asObservable();
    }

    setLoadingDeletingSaloon(loadingDeletingSaloon: boolean) {
        this.store.loadingDeletingSaloon$.next(loadingDeletingSaloon);
    }

    addSaloon(saloon: Saloon) {
        this.add<Saloon>({ data: saloon, storeRefAttribute: this.store.saloon$ })
    }

    deleteSaloon(saloonId: number) {
        this.delete<Partial<Saloon[]>>({ dataId: saloonId, storeRefAttribute: this.store.saloon$ });
    }

    updateSaloon(saloon: Partial<Saloon>, entidadId: number) {
        this.update<Partial<Saloon>>({ data: saloon, dataId: entidadId, storeRefAttribute: this.store.saloon$ })
    }

}