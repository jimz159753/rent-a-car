export interface RegisterProps {
    searchParams: ISearchParams
}

interface ISearchParams {
    category: CategoryEnum;
    agency: string;
    startDate: string;
    endDate: string;
    vehicle: string;
}

export enum CategoryEnum {
    SEDAN = 'Sedan',
    SUV = 'SUV',
    MINIVAN = 'MiniVan',
    VAN = 'Van'
}


export type FieldType = {
    dni?: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    birthday: string;
    country: string;
}