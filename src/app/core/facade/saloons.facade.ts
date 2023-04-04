import { Injectable } from '@angular/core';
import { CreateSaloonDTO, Saloon } from 'app/pages/saloons/interfaces/saloons.interface';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SaloonService } from '../services/saloons.service';
import { SaloonState } from '../states/saloons.state';

@Injectable({
    providedIn: 'root',
})
export class SaloonFacade {

    constructor(
        private saloonState: SaloonState,
        private saloonService: SaloonService
    ) { }

    // LOAD
    loadSaloon(qps?) {

        this.saloonState.setLoadingGetSaloon(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.saloonService.getSaloon(qps).pipe(
                finalize(() => this.saloonState.setLoadingGetSaloon(false))
            ).subscribe(
                // Success
                response => {
                    this.saloonState.setSaloon(response);
                    resolve(response);
                },
                // Error
                (e) => {
                    this.saloonState.setLoadingGetSaloon(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getSaloon() : Observable<Saloon[]>{
        return this.saloonState.getSaloon$();
    }

    getSaloonValue() : Saloon[]{
        return this.saloonState.getSaloon();
    }

    // ADD - CREATE
    addSaloon(saloon: CreateSaloonDTO): any | Observable<Saloon> {
        this.saloonState.setLoadingCreatingSaloon(true);

        const promise: Promise<Saloon> = new Promise((res, rej) => {
            this.saloonService.postSaloon(saloon).pipe(
                finalize(() => this.saloonState.setLoadingCreatingSaloon(false))
            ).subscribe(
                // Add al store
                (saloon) => { this.saloonState.addSaloon(saloon); res(saloon) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteSaloon(id: number) {
        this.saloonState.setLoadingDeletingSaloon(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.saloonService.deleteSaloon(id).pipe(
                finalize(() => this.saloonState.setLoadingDeletingSaloon(false))
            ).subscribe(
                (response) => { 
                    this.saloonState.deleteSaloon(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateSaloon(id: number, saloon: CreateSaloonDTO): Observable<Saloon> {
        this.saloonState.setLoadingUpdatingSaloon(true);

        const promise: Promise<Saloon> = new Promise((res, rej) => {
            this.saloonService.patchSaloon(id, saloon).pipe(
                finalize(() => this.saloonState.setLoadingUpdatingSaloon(false))
            ).subscribe(
                (saloon) => { this.saloonState.updateSaloon(saloon, saloon.id); res(saloon) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getSaloonById(id: number) {
        return this.getSaloonValue().find(saloon => saloon.id == id);
    }


}