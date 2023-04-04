import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateSaloonDTO, Saloon } from "app/pages/saloons/interfaces/saloons.interface";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestUtilitiesService } from "./rest-utilities.service";

@Injectable({
    providedIn: 'root'
})
export class SaloonService {

    constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

    getSaloon(qps?): Observable<Saloon[]> {

        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
        return this.http
            .get<any>(`${environment.apiUrl}/saloons`, {
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

    getSaloonById(id): Observable<Saloon> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .get<any>(`${environment.apiUrl}/saloons/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    postSaloon(saloon: CreateSaloonDTO): Observable<Saloon> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .post<any>(`${environment.apiUrl}/saloons`, JSON.stringify(saloon), {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    deleteSaloon(id: number) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .delete<any>(`${environment.apiUrl}/saloons/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response;
                }),
            );
    }

    patchSaloon(id: number, saloonDto: CreateSaloonDTO) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .patch<any>(
                `${environment.apiUrl}/saloons/${id}`,
                JSON.stringify(saloonDto),
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