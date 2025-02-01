export type ClientType = {
  name: string;
  phone: string;
  address: string;
  email: string;
  birthday: string;
  country: string;
};

export type RentType = {
  client: IClient;
  vehicle: IVehicle;
  startDate: string;
  endDate: string;
  days: string;
  payment?: string;
  total: string;
  description?: string;
};

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
