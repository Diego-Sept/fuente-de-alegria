import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EventTypeService } from '../services/eventType.service';
import { EventTypesState } from '../states/eventTypes.state';
import { CreateEventTypeDTO, EventType } from 'app/pages/event-types/interfaces/eventTypes.interface';

@Injectable({
    providedIn: 'root',
})
export class EventTypeFacade {

    constructor(
        private eventTypeState: EventTypesState,
        private eventTypeService: EventTypeService
    ) { }

    // LOAD
    loadEventTypes(qps?) {

        this.eventTypeState.setLoadingGetEventTypes(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.eventTypeService.getEventTypes(qps).pipe(
                finalize(() => this.eventTypeState.setLoadingGetEventTypes(false))
            ).subscribe(
                // Success
                response => {
                    this.eventTypeState.setEventTypes(response);
                    resolve(response);
                },
                // Error
                (e) => {
                    this.eventTypeState.setLoadingGetEventTypes(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getEventTypes() : Observable<EventType[]>{
        return this.eventTypeState.getEventTypes$();
    }

    getEventTypesValue() : EventType[]{
        return this.eventTypeState.getEventTypes();
    }

    // ADD - CREATE
    addEventType(eventType: CreateEventTypeDTO): any | Observable<EventType> {
        this.eventTypeState.setLoadingCreatingEventType(true);

        const promise: Promise<EventType> = new Promise((res, rej) => {
            this.eventTypeService.postEventType(eventType).pipe(
                finalize(() => this.eventTypeState.setLoadingCreatingEventType(false))
            ).subscribe(
                // Add al store
                (eventType) => { this.eventTypeState.addEventType(eventType); res(eventType) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteEventType(id: number) {
        this.eventTypeState.setLoadingDeletingEventType(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.eventTypeService.deleteEventType(id).pipe(
                finalize(() => this.eventTypeState.setLoadingDeletingEventType(false))
            ).subscribe(
                (response) => { 
                    this.eventTypeState.deleteEventType(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateEventType(id: number, eventType: CreateEventTypeDTO): Observable<EventType> {
        this.eventTypeState.setLoadingUpdatingEventType(true);

        const promise: Promise<EventType> = new Promise((res, rej) => {
            this.eventTypeService.patchEventType(id, eventType).pipe(
                finalize(() => this.eventTypeState.setLoadingUpdatingEventType(false))
            ).subscribe(
                (eventType) => { this.eventTypeState.updateEventType(eventType, eventType.id); res(eventType) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getEventTypeById(id: number) {
        return this.getEventTypesValue().find(eventType => eventType.id == id);
    }

}