import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventType } from 'app/pages/event-types/interfaces/eventTypes.interface';

@Injectable({
    providedIn: 'root',
})
export class EventTypesState extends BaseState {

    store = {

        eventTypes$: new BehaviorSubject<EventType[]>(null),

        loadingGetEventTypes$: new BehaviorSubject<boolean>(false),
        loadingCreationEventTypes$: new BehaviorSubject<boolean>(false),
        loadingUpdatingEventTypes$: new BehaviorSubject<boolean>(false),
        loadingDeletingEventTypes$: new BehaviorSubject<boolean>(false),

    }

    getEventTypes$() {
        return this.store.eventTypes$.asObservable();
    }

    getEventTypes(): EventType[] {
        return this.store.eventTypes$.value;
    }

    setEventTypes(eventTypes: EventType[]) {
        this.store.eventTypes$.next(eventTypes);
    }

    isLoadingGetEventTypes$() {
        return this.store.loadingGetEventTypes$.asObservable();
    }

    setLoadingGetEventTypes(isLoadingGetEventTypes: boolean) {
        this.store.loadingGetEventTypes$.next(isLoadingGetEventTypes);
    }

    // ADD
    isLoadingCreatingEventType$() {
        return this.store.loadingCreationEventTypes$.asObservable();
    }

    setLoadingCreatingEventType(isLoadingCreatingEventTypes: boolean) {
        this.store.loadingCreationEventTypes$.next(isLoadingCreatingEventTypes);
    }

    isLoadingUpdatingEventType$() {
        return this.store.loadingUpdatingEventTypes$.asObservable();
    }

    setLoadingUpdatingEventType(loadingUpdatingEventType: boolean) {
        this.store.loadingUpdatingEventTypes$.next(loadingUpdatingEventType);
    }

    isLoadingDeletingEventType$() {
        return this.store.loadingDeletingEventTypes$.asObservable();
    }

    setLoadingDeletingEventType(loadingDeletingEventType: boolean) {
        this.store.loadingDeletingEventTypes$.next(loadingDeletingEventType);
    }

    addEventType(eventType: EventType) {
        this.add<EventType>({ data: eventType, storeRefAttribute: this.store.eventTypes$ })
    }

    deleteEventType(eventTypeId: number) {
        this.delete<Partial<EventType[]>>({ dataId: eventTypeId, storeRefAttribute: this.store.eventTypes$ });
    }

    updateEventType(eventType: Partial<EventType>, entidadId: number) {
        this.update<Partial<EventType>>({ data: eventType, dataId: entidadId, storeRefAttribute: this.store.eventTypes$ })
    }

}