import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestUtilitiesService } from "./rest-utilities.service";
import { CreateEventTypeDTO, EventType } from "app/pages/event-types/interfaces/eventTypes.interface";

@Injectable({
    providedIn: 'root'
})
export class EventTypeService {

    constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

    getEventTypes(qps): Observable<EventType[]> {

        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
        return this.http
            .get<any>(`${environment.apiUrl}/event-types`, {
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

    getEventTypeById(id): Observable<EventType> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .get<any>(`${environment.apiUrl}/event-types/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    postEventType(eventType: CreateEventTypeDTO): Observable<EventType> {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .post<any>(`${environment.apiUrl}/event-types`, JSON.stringify(eventType), {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response.body;
                }),
            );
    }

    deleteEventType(id: number) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .delete<any>(`${environment.apiUrl}/event-types/${id}`, {
                headers: queryHeaders,
                observe: 'response',
            })
            .pipe<any>(
                map<HttpResponse<any>, any>((response) => {
                    return response;
                }),
            );
    }

    patchEventType(id: number, eventTypeDto: CreateEventTypeDTO) {
        const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .patch<any>(
                `${environment.apiUrl}/event-types/${id}`,
                JSON.stringify(eventTypeDto),
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