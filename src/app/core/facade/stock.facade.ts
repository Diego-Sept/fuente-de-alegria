import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StockState } from '../states/stock.state';
import { Stock, CreateStockDto } from 'app/pages/stock/interfaces/stock.interface';
import { StockService } from '../services/stock.service';

@Injectable({
    providedIn: 'root',
})
export class StockFacade {

    constructor(
        private stockState: StockState,
        private stockService: StockService
    ) { }

    // LOAD
    loadStockList(qps?) {

        this.stockState.setLoadingGetStockList(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.stockService.getStockList(qps).pipe(
                finalize(() => this.stockState.setLoadingGetStockList(false))
            ).subscribe(
                // Success
                response => {
                    this.stockState.setStockList(response);
                    resolve(response);
                },
                // Error
                (e) => {
                    this.stockState.setLoadingGetStockList(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getStockList() : Observable<Stock[]>{
        return this.stockState.getStockList$();
    }

    getStockListValue() : Stock[]{
        return this.stockState.getStockList();
    }

    // ADD - CREATE
    addStock(stock: CreateStockDto): any | Observable<Stock> {
        this.stockState.setLoadingCreatingStock(true);

        const promise: Promise<Stock> = new Promise((res, rej) => {
            this.stockService.postStock(stock).pipe(
                finalize(() => this.stockState.setLoadingCreatingStock(false))
            ).subscribe(
                // Add al store
                (stock) => { this.stockState.addStock(stock); res(stock) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteStock(id: number) {
        this.stockState.setLoadingDeletingStock(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.stockService.deleteStock(id).pipe(
                finalize(() => this.stockState.setLoadingDeletingStock(false))
            ).subscribe(
                (response) => { 
                    this.stockState.deleteStock(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateStock(id: number, stock: CreateStockDto): Observable<Stock> {
        this.stockState.setLoadingUpdatingStock(true);

        const promise: Promise<Stock> = new Promise((res, rej) => {
            this.stockService.patchStock(id, stock).pipe(
                finalize(() => this.stockState.setLoadingUpdatingStock(false))
            ).subscribe(
                (stock) => { this.stockState.updateStock(stock, stock.id); res(stock) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getStockById(id: number) {
        return this.getStockListValue().find(stock => stock.id == id);
    }


}