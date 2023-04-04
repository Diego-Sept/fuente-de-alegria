import { Store } from "app/core/states/base.state";
import { Product } from "app/pages/products/interfaces/products.interface";

export interface Stock{
    id: number;
    quantity: number;
    productId: number;
    product?: Product;
    storeId: number;
    store?: Store;
}

export interface CreateStockDto{
    productId: number;
    storeId: number;
    quantity: number;
}