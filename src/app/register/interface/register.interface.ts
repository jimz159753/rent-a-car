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
