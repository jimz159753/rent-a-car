import { DatePicker, Form, Input } from "antd";
import React from "react";
import { ClientType } from "../interface/register.interface";
import "./clientForm.css";

interface FormProps {
  form: any;
}

export const ClientForm = ({ form }: FormProps) => {
  return (
    <Form requiredMark={"optional"} form={form} className="clients-form">
      <Form.Item<ClientType>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Nombre requerido." }]}
      >
        <Input placeholder="nombre" />
      </Form.Item>
      <Form.Item<ClientType>
        label="Teléfono"
        name="phone"
        rules={[{ required: true, message: "Teléfono requerido." }]}
      >
        <Input placeholder="teléfono" />
      </Form.Item>
      <Form.Item<ClientType>
        label="Dirección"
        name="address"
        rules={[{ required: true, message: "Dirección requerido." }]}
      >
        <Input placeholder="dirección" />
      </Form.Item>
      <Form.Item<ClientType>
        label="Correo Eléctronico"
        name="email"
        rules={[{ required: true, message: "Correo eléctronico requerido." }]}
      >
        <Input placeholder="correo eléctronico" />
      </Form.Item>
      <Form.Item<ClientType>
        label="Fecha de nacimiento"
        name="birthday"
        rules={[{ required: true, message: "Fecha de nacimiento requerido." }]}
      >
        <DatePicker placeholder="fecha de nacimiento" />
      </Form.Item>
      <Form.Item<ClientType>
        label="País"
        name="country"
        rules={[{ required: true, message: "País requerido." }]}
      >
        <Input placeholder="país" />
      </Form.Item>
    </Form>
  );
};
