export interface IVehicle {
    _id: string;
    model: string;
    image?: string;
    brand: string;
    plate: string;
    price: string;
    status: StatusEnum;
    timestamp?: string;
}

export enum ActionEnum {
    ADD = 'Add',
    UPDATE = 'Update'
}

export enum StatusEnum {
    AVAILABLE = 'Disponible',
    RENTED = 'Alquildo'
}

export type IDropdownOption = {
    value: StatusEnum;
    label: string;
}

export type FieldType = {
    model: string;
    image: string;
    brand: string;
    plate: string;
    price: string;
    status: StatusEnum;
}