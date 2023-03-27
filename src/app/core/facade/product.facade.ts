import { Injectable } from '@angular/core';
import { CreateProductDTO, Product } from 'app/pages/products/interfaces/products.interface';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ProductState } from '../states/product.state';

@Injectable({
    providedIn: 'root',
})
export class ProductFacade {

    constructor(
        private productState: ProductState,
        private productService: ProductService
    ) { }

    // LOAD
    loadProducts(qps?) {

        this.productState.setLoadingGetProducts(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.productService.getProducts(qps).pipe(
                finalize(() => this.productState.setLoadingGetProducts(false))
            ).subscribe(
                // Success
                response => {
                    this.productState.setProducts(response);
                    resolve(response);
                },
                // Error
                (e) => {
                    this.productState.setLoadingGetProducts(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getProducts() : Observable<Product[]>{
        return this.productState.getProducts$();
    }

    getProductsValue() : Product[]{
        return this.productState.getProducts();
    }

    // ADD - CREATE
    addProduct(product: CreateProductDTO): any | Observable<Product> {
        this.productState.setLoadingCreatingProduct(true);

        const promise: Promise<Product> = new Promise((res, rej) => {
            this.productService.postProduct(product).pipe(
                finalize(() => this.productState.setLoadingCreatingProduct(false))
            ).subscribe(
                // Add al store
                (product) => { this.productState.addProduct(product); res(product) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteProduct(id: number) {
        this.productState.setLoadingDeletingProduct(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.productService.deleteProduct(id).pipe(
                finalize(() => this.productState.setLoadingDeletingProduct(false))
            ).subscribe(
                (response) => { 
                    this.productState.deleteProduct(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateProduct(id: number, product: CreateProductDTO): Observable<Product> {
        this.productState.setLoadingUpdatingProduct(true);

        const promise: Promise<Product> = new Promise((res, rej) => {
            this.productService.patchProduct(id, product).pipe(
                finalize(() => this.productState.setLoadingUpdatingProduct(false))
            ).subscribe(
                (product) => { this.productState.updateProduct(product, product.id); res(product) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getProductById(id: number) {
        return this.getProductsValue().find(product => product.id == id);
    }


}