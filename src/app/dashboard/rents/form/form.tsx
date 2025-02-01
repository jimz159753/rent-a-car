import React from "react";
import {
  ActionEnum,
  FieldType,
  IClient,
  IVehicle,
} from "../interfaces/rent.interface";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import "./form.css";
import { Dayjs } from "dayjs";

interface FormProps {
  setOpen: (e: boolean) => void;
  payment: string;
  total: string;
  startDate: string;
  endDate: string;
  description: string;
  action: ActionEnum;
  dropClients: IClient[];
  dropVehicles: IVehicle[];
  handleAction: (values: FieldType) => void;
  form: any;
  client: string;
  vehicle: string;
}

export const RentForm = ({
  setOpen,
  client,
  vehicle,
  payment,
  total,
  startDate,
  endDate,
  description,
  action,
  dropClients,
  dropVehicles,
  handleAction,
  form,
}: FormProps) => {
  return (
    <Form
      requiredMark={"optional"}
      form={form}
      initialValues={{
        client,
        vehicle,
        payment,
        total,
        startDate,
        endDate,
        description,
      }}
      className="rents-form"
      onFinish={(values) => {
        const vehicleObj = JSON.parse(values.vehicle);
        values.total =
          vehicleObj.price *
            Number(values.endDate.diff(values.startDate, "days")) -
          Number(values.payment);
        values.days = values.endDate.diff(values.startDate, "days");
        values.startDate = values.startDate.format("YYYY-MM-DD");
        values.endDate = values.endDate.format("YYYY-MM-DD");
        handleAction(values);
      }}
    >
      <Form.Item<FieldType>
        label="Cliente"
        name="client"
        rules={[{ required: true, message: "Cliente requerido." }]}
      >
        <Select placeholder="selecciona un cliente" options={dropClients} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Vehículo"
        name="vehicle"
        rules={[{ required: true, message: "Vehículo requerido." }]}
      >
        <Select placeholder="selecciona un vehículo" options={dropVehicles} />
      </Form.Item>
      <Form.Item<FieldType> label="Anticipo" name="payment">
        <InputNumber
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          placeholder="payment"
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Día de entrada"
        name="startDate"
        rules={[{ required: true, message: "Día requerido." }]}
      >
        <DatePicker placeholder="entrada" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Día de salída"
        name="endDate"
        rules={[{ required: true, message: "Día requerido." }]}
      >
        <DatePicker placeholder="salída" />
      </Form.Item>
      <Form.Item<FieldType> label="Descripción" name="description">
        <Input placeholder="descripción" />
      </Form.Item>
      <div className="mt-10 flex justify-between">
        <Button className="cancel" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Form.Item>
          <Button className="submit" htmlType="submit">
            {action === ActionEnum.ADD ? "Agregar" : "Actualizar"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
