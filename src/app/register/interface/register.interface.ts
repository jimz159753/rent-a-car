export interface RegisterProps {
  searchParams: ISearchParams;
}

interface ISearchParams {
  category: CategoryEnum;
  agency: string;
  startDate: string;
  endDate: string;
  vehicle: string;
}

export enum CategoryEnum {
  SEDAN = "Sedan",
  SUV = "SUV",
  MINIVAN = "MiniVan",
  VAN = "Van",
}

export type ClientType = {
  name: string;
  phone: string;
  address: string;
  email: string;
  birthday: string;
  country: string;
};

export interface IRent {
  _id?: string;
  client: IClient;
  vehicle: IVehicle;
  days: string;
  payment?: string;
  startDate: string;
  endDate: string;
  total: string;
  description?: string;
  timestamp?: string;
}

export interface IClient {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  timestamp?: string;
}

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

export enum StatusEnum {
  AVAILABLE = "Disponible",
  RENTED = "Alquildo",
}
