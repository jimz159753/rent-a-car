export interface IRent {
    _id: string;
    client: IClient;
    vehicle: IVehicle;
    days: string;
    payment: string;
    total: string;
    description: string;
    timestamp?: string;
}

export interface IClient {
    _id?: string;
    dni: string;
    name: string;
    phone: string;
    address: string;
    timestamp?: string;
}

export interface IVehicle {
    _id?: string;
    model: string;
    image?: string;
    brand: string;
    plate: string;
    price: string;
    status: StatusEnum;
    timestamp?: string;
}

export enum StatusEnum {
    AVAILABLE = 'Disponible',
    RENTED = 'Alquildo'
}

export enum ActionEnum {
    ADD = 'Add',
    UPDATE = 'Update'
}

export type FieldType = {
    client: string;
    vehicle: string;
    days: string;
    payment: string;
    total: string;
    description: string;
}