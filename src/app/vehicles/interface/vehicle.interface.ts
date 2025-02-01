export interface IVehicle {
  _id: string;
  type: string;
  ac: boolean;
  people: string;
  doors: string;
  suitcases: string;
  bags: string;
  transmition: TransmitionEnum;
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
  AUTOMATIC = "Automático",
  STANDARD = "Manual",
}

export enum StatusEnum {
  AVAILABLE = "Disponible",
  RENTED = "Alquildo",
}

export type FieldType = {
  type: string;
  ac: boolean;
  people: string;
  doors: string;
  suitcases: string;
  bags: string;
  transmition: TransmitionEnum;
  model: string;
  image: string;
  category: CategoryEnum;
  brand: string;
  plate: string;
  price: string;
  status: StatusEnum;
};

export enum CategoryEnum {
  SEDAN = "Sedan",
  SUV = "SUV",
  MINIVAN = "MiniVan",
  VAN = "Van",
}

export interface VehicleProps {
  searchParams: {
    category: CategoryEnum;
    agency: string;
    startDate: string;
    endDate: string;
    vehicle: string;
  };
}
