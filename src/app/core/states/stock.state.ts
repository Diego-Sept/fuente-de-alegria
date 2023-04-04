import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Stock } from 'app/pages/stock/interfaces/stock.interface';

@Injectable({
    providedIn: 'root',
})
export class StockState extends BaseState {

    store = {

        stockList$: new BehaviorSubject<Stock[]>(null),

        loadingGetStockList$: new BehaviorSubject<boolean>(false),
        loadingCreationStockList$: new BehaviorSubject<boolean>(false),
        loadingUpdatingStockList$: new BehaviorSubject<boolean>(false),
        loadingDeletingStockList$: new BehaviorSubject<boolean>(false),

    }

    getStockList$() {
        return this.store.stockList$.asObservable();
    }

    getStockList(): Stock[] {
        return this.store.stockList$.value;
    }

    setStockList(stockList: Stock[]) {
        this.store.stockList$.next(stockList);
    }

    isLoadingGetStockList$() {
        return this.store.loadingGetStockList$.asObservable();
    }

    setLoadingGetStockList(isLoadingGetStockList: boolean) {
        this.store.loadingGetStockList$.next(isLoadingGetStockList);
    }

    // ADD
    isLoadingCreatingStock$() {
        return this.store.loadingCreationStockList$.asObservable();
    }

    setLoadingCreatingStock(isLoadingCreatingStockList: boolean) {
        this.store.loadingCreationStockList$.next(isLoadingCreatingStockList);
    }

    isLoadingUpdatingStock$() {
        return this.store.loadingUpdatingStockList$.asObservable();
    }

    setLoadingUpdatingStock(loadingUpdatingStock: boolean) {
        this.store.loadingUpdatingStockList$.next(loadingUpdatingStock);
    }

    isLoadingDeletingStock$() {
        return this.store.loadingDeletingStockList$.asObservable();
    }

    setLoadingDeletingStock(loadingDeletingStock: boolean) {
        this.store.loadingDeletingStockList$.next(loadingDeletingStock);
    }

    addStock(stock: Stock) {
        this.add<Stock>({ data: stock, storeRefAttribute: this.store.stockList$ })
    }

    deleteStock(stockId: number) {
        this.delete<Partial<Stock[]>>({ dataId: stockId, storeRefAttribute: this.store.stockList$ });
    }

    updateStock(stock: Partial<Stock>, entidadId: number) {
        this.update<Partial<Stock>>({ data: stock, dataId: entidadId, storeRefAttribute: this.store.stockList$ })
    }

}