import {
  ActionEnum,
  FieldType,
  IUser,
  RoleEnum,
} from "../interfaces/user.interface";
import "./form.css";
import { Button, Form, Input, Select } from "antd";

interface FormProps {
  setOpen: (e: boolean) => void;
  email: string;
  action: ActionEnum;
  handleAction: (values: FieldType) => void;
  form: any;
  user: IUser;
}

export const UserForm = ({
  setOpen,
  email,
  form,
  action,
  handleAction,
  user,
}: FormProps) => {
  const dropRoles = [
    {
      value: RoleEnum.ADMIN,
      label: RoleEnum.ADMIN,
    },
    {
      value: RoleEnum.EMPLOYEE,
      label: RoleEnum.EMPLOYEE,
    },
  ];

  return (
    <Form
      requiredMark={"optional"}
      form={form}
      className="administration-form"
      onFinish={handleAction}
    >
      <Form.Item<IUser>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Nombre requerido." }]}
      >
        <Input placeholder="nombre" />
      </Form.Item>
      <Form.Item<IUser>
        label="Correo eléctronico"
        name="email"
        rules={[{ required: true, message: "Correo eléctronico requerido." }]}
      >
        <Input placeholder="email" />
      </Form.Item>
      <Form.Item<IUser>
        label="Teléfono"
        name="phone"
        rules={[{ required: true, message: "Teléfono requerido." }]}
      >
        <Input placeholder="phone" />
      </Form.Item>
      <Form.Item<IUser>
        label="Dirección"
        name="address"
        rules={[{ required: true, message: "Dirección requerido." }]}
      >
        <Input placeholder="address" />
      </Form.Item>
      <Form.Item<IUser>
        label="Role"
        name="role"
        rules={[{ required: true, message: "Role requerido." }]}
      >
        <Select placeholder="selecciona un role" options={dropRoles} />
      </Form.Item>
      {user.email === email ? (
        <Form.Item<IUser>
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Contraseña requerida." }]}
        >
          <Input.Password placeholder="contraseña" />
        </Form.Item>
      ) : user.role === RoleEnum.ADMIN && action === ActionEnum.ADD ? (
        <Form.Item<IUser>
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Contraseña requerida." }]}
        >
          <Input.Password placeholder="contraseña" />
        </Form.Item>
      ) : null}
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
