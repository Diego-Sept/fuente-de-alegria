import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestUtilitiesService } from "./rest-utilities.service";
import { CreateStockDto, Stock } from "app/pages/stock/interfaces/stock.interface";

@Injectable({
    providedIn: 'root'
})
export class StockService {

    constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

    getStockList(qps): Observable<Stock[]> {

        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
        return this.http
            .get<any>(`${environment.apiUrl}/stock`, {
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

    getStockById(id): Observable<Stock> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .get<any>(`${environment.apiUrl}/stock/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    postStock(stock: CreateStockDto): Observable<Stock> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .post<any>(`${environment.apiUrl}/stock`, JSON.stringify(stock), {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    deleteStock(id: number) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .delete<any>(`${environment.apiUrl}/stock/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response;
                }),
            );
    }

    patchStock(id: number, stockDto: CreateStockDto) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .patch<any>(
                `${environment.apiUrl}/stock/${id}`,
                JSON.stringify(stockDto),
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