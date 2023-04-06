import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestUtilitiesService } from "./rest-utilities.service";
import { CreateFractionDto, Fraction } from "app/pages/fraction/interface/fraction.interface";

@Injectable({
    providedIn: 'root'
})
export class FractionService {

    constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

    getFractions(qps): Observable<Fraction[]> {

        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
        return this.http
            .get<any>(`${environment.apiUrl}/fractions`, {
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

    getFractionById(id): Observable<Fraction> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .get<any>(`${environment.apiUrl}/fractions/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    postFraction(fraction: CreateFractionDto): Observable<Fraction> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .post<any>(`${environment.apiUrl}/fractions`, JSON.stringify(fraction), {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    deleteFraction(id: number) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .delete<any>(`${environment.apiUrl}/fractions/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response;
                }),
            );
    }

    patchFraction(id: number, fractionDto: CreateFractionDto) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .patch<any>(
                `${environment.apiUrl}/fractions/${id}`,
                JSON.stringify(fractionDto),
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