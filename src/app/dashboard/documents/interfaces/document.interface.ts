import { IRent } from "../../rents/interfaces/rent.interface";

export interface IDocument {
    _id: string;
    rent: IRent
    document: string;
    timestamp?: string;
}

export interface IClient {
    _id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    birthday: string;
    country: string;
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
    rent: string;
    document: string;
}