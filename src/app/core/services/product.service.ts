import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateProductDTO, Product } from "app/pages/products/interfaces/products.interface";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestUtilitiesService } from "./rest-utilities.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

    getProducts(qps): Observable<Product[]> {

        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
        return this.http
            .get<any>(`${environment.apiUrl}/products`, {
                headers: queryHeaders,
                observe: 'response',
                params: queryParams,
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    getProductById(id): Observable<Product> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .get<any>(`${environment.apiUrl}/products/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    postProduct(product: CreateProductDTO): Observable<Product> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .post<any>(`${environment.apiUrl}/products`, JSON.stringify(product), {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    deleteProduct(id: number) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .delete<any>(`${environment.apiUrl}/products/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response;
                }),
            );
    }

    patchProduct(id: number, productDto: CreateProductDTO) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .patch<any>(
                `${environment.apiUrl}/products/${id}`,
                JSON.stringify(productDto),
                {
                    headers: queryHeaders,
                    observe: 'response',
                },
            )
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

}