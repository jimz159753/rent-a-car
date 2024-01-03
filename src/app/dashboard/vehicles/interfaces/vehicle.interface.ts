export interface IVehicle {
    _id?: string;
    model: string;
    image?: string;
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
