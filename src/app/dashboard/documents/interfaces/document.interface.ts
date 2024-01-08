export interface IDocument {
    _id: string;
    name: string;
    client: IClient;
    vehicle: IVehicle;
    timestamp?: string;
}

export interface IClient {
    _id: string;
    dni: string;
    name: string;
    phone: string;
    address: string;
    timestamp?: string;
}

export interface IVehicle {
    _id: string;
    model: string;
    image: string;
    brand: string;
    plate: string;
    price: string;
    status: string;
    timestamp?: string;
}

export enum ActionEnum {
    ADD = 'Add',
    UPDATE = 'Update'
}

export type FieldType = {
    name: string;
    client: string;
    vehicle: string;
}