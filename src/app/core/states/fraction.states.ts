import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Fraction } from 'app/pages/fraction/interface/fraction.interface';


@Injectable({
    providedIn: 'root',
})
export class FractionState extends BaseState {

    store = {

        fraction$: new BehaviorSubject<Fraction[]>(null),

        loadingGetFractions$: new BehaviorSubject<boolean>(false),
        loadingCreationFraction$: new BehaviorSubject<boolean>(false),
        loadingUpdatingFraction$: new BehaviorSubject<boolean>(false),
        loadingDeletingFraction$: new BehaviorSubject<boolean>(false),

    }

    // Categories of Evolutions
    getFractions$() {
        return this.store.fraction$.asObservable();
    }

    getFractions(): Fraction[] {
        return this.store.fraction$.value;
    }

    setFractions(fractions: Fraction[]) {
        this.store.fraction$.next(fractions);
    }

    isLoadingGetFractions$() {
        return this.store.loadingGetFractions$.asObservable();
    }

    setLoadingGetFractions(isLoadingGetFractions: boolean) {
        this.store.loadingGetFractions$.next(isLoadingGetFractions);
    }

    // ADD
    isLoadingCreatingFraction$() {
        return this.store.loadingCreationFraction$.asObservable();
    }

    setLoadingCreatingFraction(isLoadingCreatingFractions: boolean) {
        this.store.loadingCreationFraction$.next(isLoadingCreatingFractions);
    }

    isLoadingUpdatingFraction$() {
        return this.store.loadingUpdatingFraction$.asObservable();
    }

    setLoadingUpdatingFraction(loadingUpdatingFraction: boolean) {
        this.store.loadingUpdatingFraction$.next(loadingUpdatingFraction);
    }

    isLoadingDeletingFraction$() {
        return this.store.loadingDeletingFraction$.asObservable();
    }

    setLoadingDeletingFraction(loadingDeletingFraction: boolean) {
        this.store.loadingDeletingFraction$.next(loadingDeletingFraction);
    }

    addFraction(fraction: Fraction) {
        this.add<Fraction>({ data: fraction, storeRefAttribute: this.store.fraction$ })
    }

    deleteFraction(fractionId: number) {
        this.delete<Partial<Fraction[]>>({ dataId: fractionId, storeRefAttribute: this.store.fraction$ });
    }

    updateFraction(fraction: Partial<Fraction>, entidadId: number) {
        this.update<Partial<Fraction>>({ data: fraction, dataId: entidadId, storeRefAttribute: this.store.fraction$ })
    }

}