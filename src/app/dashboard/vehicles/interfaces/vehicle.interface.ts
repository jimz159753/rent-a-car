export interface IVehicle {
    _id: string;
    ac: boolean;
    type: string;
    people: string;
    doors: string;
    suitcases: string;
    bags: string;
    transmition: TransmitionEnum,
    category: CategoryEnum;
    model: string;
    image?: string;
    brand: string;
    plate: string;
    price: string;
    status: StatusEnum;
    timestamp?: string;
}

export enum TransmitionEnum {
    AUTOMATIC = 'Automático',
    STANDARD = 'Manual'
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
    type: string;
    ac: boolean;
    people: string;
    doors: string;
    suitcases: string;
    bags: string;
    transmition: TransmitionEnum,
    model: string;
    category: CategoryEnum;
    image: string;
    brand: string;
    plate: string;
    price: string;
    status: StatusEnum;
}

export enum CategoryEnum {
    SEDAN = 'Sedan',
    SUV = 'SUV',
    MINIVAN = 'MiniVan',
    VAN = 'Van'
}