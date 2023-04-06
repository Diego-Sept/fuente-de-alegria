import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FractionState } from '../states/fraction.states';
import { FractionService } from '../services/fraction.service';
import { CreateFractionDto, Fraction } from 'app/pages/fraction/interface/fraction.interface';

@Injectable({
    providedIn: 'root',
})
export class FractionFacade {

    constructor(
        private fractionState: FractionState,
        private fractionService: FractionService
    ) { }

    // LOAD
    loadFractions(qps?) {

        this.fractionState.setLoadingGetFractions(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.fractionService.getFractions(qps).pipe(
                finalize(() => this.fractionState.setLoadingGetFractions(false))
            ).subscribe(
                // Success
                response => {
                    this.fractionState.setFractions(response)
                },
                // Error
                (e) => {
                    this.fractionState.setLoadingGetFractions(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getFractions() : Observable<Fraction[]>{
        return this.fractionState.getFractions$();
    }

    getFractionsValue() : Fraction[]{
        return this.fractionState.getFractions();
    }

    // ADD - CREATE
    addFraction(fraction: CreateFractionDto): any | Observable<Fraction> {
        this.fractionState.setLoadingCreatingFraction(true);

        const promise: Promise<Fraction> = new Promise((res, rej) => {
            this.fractionService.postFraction(fraction).pipe(
                finalize(() => this.fractionState.setLoadingCreatingFraction(false))
            ).subscribe(
                // Add al store
                (fraction) => { this.fractionState.addFraction(fraction); res(fraction) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteFraction(id: number) {
        this.fractionState.setLoadingDeletingFraction(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.fractionService.deleteFraction(id).pipe(
                finalize(() => this.fractionState.setLoadingDeletingFraction(false))
            ).subscribe(
                (response) => { 
                    this.fractionState.deleteFraction(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateFraction(id: number, fraction: CreateFractionDto): Observable<Fraction> {
        this.fractionState.setLoadingUpdatingFraction(true);

        const promise: Promise<Fraction> = new Promise((res, rej) => {
            this.fractionService.patchFraction(id, fraction).pipe(
                finalize(() => this.fractionState.setLoadingUpdatingFraction(false))
            ).subscribe(
                (fraction) => { this.fractionState.updateFraction(fraction, fraction.id); res(fraction) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getFractionById(id: number) {
        return this.getFractionsValue().find(fraction => fraction.id == id);
    }


}