export interface IClient {
    _id: string;
    dni: string;
    name: string;
    phone: string;
    address: string;
    timestamp?: string;
}

export enum ActionEnum {
    ADD = 'Add',
    UPDATE = 'Update'
}

export type FieldType = {
    dni: string;
    name: string;
    phone: string;
    address: string;
}