export interface Store{
    id?: number;   
    name: string;
}

export interface StoreDto{
    storeData: CreateStoreDto;
}

export interface CreateStoreDto{
    id?: number;
    name: string;
}