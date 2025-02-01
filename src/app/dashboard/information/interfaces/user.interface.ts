export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: RoleEnum;
  password: string;
  timestamp?: string;
}

export enum RoleEnum {
  ADMIN = "Admin",
  EMPLOYEE = "Employee",
}

export type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: RoleEnum;
  password: string;
};
