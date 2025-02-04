export interface IVehicle {
  _id?: string;
  ac: boolean;
  type: string;
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

export type TypeVehicle = {
  type: string;
  ac: boolean;
  people: string;
  doors: string;
  suitcases: string;
  bags: string;
  transmition: TransmitionEnum;
  model: string;
  category: CategoryEnum;
  image: string;
  brand: string;
  plate: string;
  price: string;
  status: StatusEnum;
};

export enum TransmitionEnum {
  AUTOMATIC = "Automático",
  STANDARD = "Manual",
}

export enum ActionEnum {
  ADD = "Add",
  UPDATE = "Update",
}

export enum StatusEnum {
  AVAILABLE = "Disponible",
  RENTED = "Alquildo",
}

export type IDropdownOption = {
  value: StatusEnum;
  label: string;
};

export enum CategoryEnum {
  SEDAN = "Sedan",
  SUV = "SUV",
  MINIVAN = "MiniVan",
  VAN = "Van",
}

export const dropStatus = [
  {
    lable: StatusEnum.AVAILABLE,
    value: StatusEnum.AVAILABLE,
  },
  {
    lable: StatusEnum.RENTED,
    value: StatusEnum.RENTED,
  },
];

export const dropCategory = [
  {
    label: CategoryEnum.SEDAN,
    value: CategoryEnum.SEDAN,
  },
  {
    label: CategoryEnum.SUV,
    value: CategoryEnum.SUV,
  },
  {
    label: CategoryEnum.MINIVAN,
    value: CategoryEnum.MINIVAN,
  },
  {
    label: CategoryEnum.VAN,
    value: CategoryEnum.VAN,
  },
];

export const dropTransmition = [
  {
    label: TransmitionEnum.AUTOMATIC,
    value: TransmitionEnum.AUTOMATIC,
  },
  {
    label: TransmitionEnum.STANDARD,
    value: TransmitionEnum.STANDARD,
  },
];

export const dropAC = [
  {
    label: "Si",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];