export interface IVehicle {
    _id: string;
    category: CategoryEnum;
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

export type FieldType = {
    model: string;
    image: string;
    category: CategoryEnum;
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

export interface VehicleProps {
    searchParams: {
        category: CategoryEnum
    }
}