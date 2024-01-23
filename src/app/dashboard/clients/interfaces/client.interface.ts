export interface IClient {
    _id: string;
    dni: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    birthday: string;
    country: string;
    timestamp?: string;
}

export enum ActionEnum {
    ADD = 'Add',
    UPDATE = 'Update'
}

export type FieldType = {
    name: string;
    phone: string;
    address: string;
    email: string;
    birthday: string;
    country: string;
}