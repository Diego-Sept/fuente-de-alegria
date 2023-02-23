import { BehaviorSubject } from 'rxjs';

export interface IUpdate<Data> {
    data: Data,
    dataId?: string | number,
    storeRefAttribute: BehaviorSubject<any>,
}
export interface IAdd<Data> {
    data: Data,
    storeRefAttribute: BehaviorSubject<any>,
}
export interface IDelete<Data> {
    dataId?: string | number,
    storeRefAttribute: BehaviorSubject<any>,
}

export type Store = {
    [propName: string]: BehaviorSubject<any>
}
export class BaseState {
    protected store: Store;

    constructor() {
    }

    cleanStore: () => void = () => {
        const properties = Object.entries(this.store);
        setTimeout(() => {
            console.log('Se registró');
            properties.forEach(([propertie, _]) => {
                this.store[propertie].next(null);
            })
        }, 500);
    };
     
    update<Data>(obj: IUpdate<Data>) {
        const propertyStore = obj.storeRefAttribute.getValue();
        if (Array.isArray(propertyStore)) {
            let indexData = propertyStore.findIndex(value => value.id == obj.dataId);
            if (indexData != -1) {
                propertyStore[indexData] = { ...propertyStore[indexData], ...obj.data }
                console.info('Updating store', propertyStore);
                obj.storeRefAttribute.next(propertyStore);
            } else {
                console.error('The resource to update was not found');
            }
        } else {
            console.info('Updating store: ', { ...propertyStore, ...obj.data });
            obj.storeRefAttribute.next({ ...propertyStore, ...obj.data });
        }
    }

    add<Data>(obj: IAdd<Data>) {
        const propertyStore = obj.storeRefAttribute.getValue();
        if (Array.isArray(propertyStore)) {
            propertyStore.push(obj.data);
            obj.storeRefAttribute.next(propertyStore);
        }
        // !ELSE?
    }

    delete<Data>(obj : IDelete<Data>){
        let propertyStore = obj.storeRefAttribute.getValue();
        if (Array.isArray(propertyStore)) {
            let indexData = propertyStore.findIndex(value => value.id == obj.dataId);
            if (indexData != -1) {
                propertyStore = [ ...propertyStore.slice(0, indexData), ...propertyStore.slice(indexData + 1, propertyStore.length) ];
                console.info('Updating store', propertyStore);
                obj.storeRefAttribute.next(propertyStore);
            } else {
                console.error('The resource to delete was not found');
            }
        }
    }
}