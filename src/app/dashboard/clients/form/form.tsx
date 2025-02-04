import React from "react";
import { ActionEnum, IClient } from "../interfaces/client.interface";
import { Button, Input, Form, DatePicker, FormInstance } from "antd";
import "./form.css";

interface FormProps {
  setOpen: (value: boolean) => void;
  action: ActionEnum;
  handleAction: (values: IClient) => void;
  form: FormInstance;
}

export const ClientForm = ({
  setOpen,
  action,
  handleAction,
  form,
}: FormProps) => {
  return (
    <Form
      requiredMark={"optional"}
      form={form}
      className="clients-form"
      onFinish={handleAction}
    >
      <Form.Item<IClient>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Nombre requerido." }]}
      >
        <Input placeholder="nombre" />
      </Form.Item>
      <Form.Item<IClient>
        label="Teléfono"
        name="phone"
        rules={[{ required: true, message: "Teléfono requerido." }]}
      >
        <Input placeholder="teléfono" />
      </Form.Item>
      <Form.Item<IClient>
        label="Dirección"
        name="address"
        rules={[{ required: true, message: "Dirección requerido." }]}
      >
        <Input placeholder="dirección" />
      </Form.Item>
      <Form.Item<IClient>
        label="Correo Eléctronico"
        name="email"
        rules={[{ required: true, message: "Correo eléctronico requerido." }]}
      >
        <Input placeholder="correo eléctronico" />
      </Form.Item>
      <Form.Item<IClient>
        label="Fecha de nacimiento"
        name="birthday"
        rules={[{ required: true, message: "Fecha de nacimiento requerido." }]}
      >
        <DatePicker placeholder="entrada" />
      </Form.Item>
      <Form.Item<IClient>
        label="País"
        name="country"
        rules={[{ required: true, message: "País requerido." }]}
      >
        <Input placeholder="país" />
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
