import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from 'app/pages/products/interfaces/products.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductState extends BaseState {

    store = {

        products$: new BehaviorSubject<Product[]>(null),

        loadingGetProducts$: new BehaviorSubject<boolean>(false),
        loadingCreationProducts$: new BehaviorSubject<boolean>(false),
        loadingUpdatingProducts$: new BehaviorSubject<boolean>(false),
        loadingDeletingProducts$: new BehaviorSubject<boolean>(false),

    }

    // Categories of Evolutions
    getProducts$() {
        return this.store.products$.asObservable();
    }

    getProducts(): Product[] {
        return this.store.products$.value;
    }

    setProducts(products: Product[]) {
        this.store.products$.next(products);
    }

    isLoadingGetProducts$() {
        return this.store.loadingGetProducts$.asObservable();
    }

    setLoadingGetProducts(isLoadingGetProducts: boolean) {
        this.store.loadingGetProducts$.next(isLoadingGetProducts);
    }

    // ADD
    isLoadingCreatingProduct$() {
        return this.store.loadingCreationProducts$.asObservable();
    }

    setLoadingCreatingProduct(isLoadingCreatingProducts: boolean) {
        this.store.loadingCreationProducts$.next(isLoadingCreatingProducts);
    }

    isLoadingUpdatingProduct$() {
        return this.store.loadingUpdatingProducts$.asObservable();
    }

    setLoadingUpdatingProduct(loadingUpdatingProduct: boolean) {
        this.store.loadingUpdatingProducts$.next(loadingUpdatingProduct);
    }

    isLoadingDeletingProduct$() {
        return this.store.loadingDeletingProducts$.asObservable();
    }

    setLoadingDeletingProduct(loadingDeletingProduct: boolean) {
        this.store.loadingDeletingProducts$.next(loadingDeletingProduct);
    }

    addProduct(product: Product) {
        this.add<Product>({ data: product, storeRefAttribute: this.store.products$ })
    }

    deleteProduct(productId: number) {
        this.delete<Partial<Product[]>>({ dataId: productId, storeRefAttribute: this.store.products$ });
    }

    updateProduct(product: Partial<Product>, entidadId: number) {
        this.update<Partial<Product>>({ data: product, dataId: entidadId, storeRefAttribute: this.store.products$ })
    }

}