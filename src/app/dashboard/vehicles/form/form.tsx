import React from "react";
import {
  ActionEnum,
  dropAC,
  dropCategory,
  dropStatus,
  dropTransmition,
  IVehicle,
  TypeVehicle,
} from "../interfaces/vehicle.interface";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadProps,
  message,
  FormInstance,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./form.css";

interface FormProps {
  setOpen: (e: boolean) => void;
  action: ActionEnum;
  handleAction: (values: TypeVehicle) => void;
  form: FormInstance;
}

const props: UploadProps = {
  accept: "image/png",
  headers: { "content-type": "multipart/form-data" },
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  customRequest: ({ onSuccess }: any) => onSuccess("ok"),
  maxCount: 1,
  listType: "picture",
};

export const VehicleForm = ({
  setOpen,
  action,
  handleAction,
  form,
}: FormProps) => (
  <Form
    requiredMark={"optional"}
    form={form}
    className="vehicles-form"
    onFinish={handleAction}
  >
    <Form.Item<IVehicle>
      label="Tipo"
      name="type"
      rules={[{ required: true, message: "Tipo requerido." }]}
    >
      <Input placeholder="tipo" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Modelo"
      name="model"
      rules={[{ required: true, message: "Modelo requerido." }]}
    >
      <Input placeholder="modelo" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Cantidad de personas"
      name="people"
      rules={[{ required: true, message: "Cantidad requerida." }]}
    >
      <InputNumber placeholder="cantidad de personas" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Cantidad de puertas"
      name="doors"
      rules={[{ required: true, message: "Cantidad requerida." }]}
    >
      <InputNumber placeholder="cantidad de puertas" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Cantidad de maletas"
      name="suitcases"
      rules={[{ required: true, message: "Cantidad requerida." }]}
    >
      <InputNumber placeholder="cantidad de maletas" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Cantidad de mochilas"
      name="bags"
      rules={[{ required: true, message: "Cantidad requerida." }]}
    >
      <InputNumber placeholder="cantidad de mochilas" />
    </Form.Item>

    <Form.Item<IVehicle>
      label="Marca"
      name="brand"
      rules={[{ required: true, message: "Marca requerido." }]}
    >
      <Input placeholder="marca" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Placa"
      name="plate"
      rules={[{ required: true, message: "Placa requerido." }]}
    >
      <Input placeholder="plate" />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Precio"
      name="price"
      rules={[{ required: true, message: "Precio requerido." }]}
    >
      <InputNumber
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
        placeholder="price"
      />
    </Form.Item>
    <Form.Item<IVehicle>
      label="AC"
      name="ac"
      rules={[{ required: true, message: "AC requerido." }]}
    >
      <Select placeholder="selecciona un AC" options={dropAC} />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Transmisión"
      name="transmition"
      rules={[{ required: true, message: "Transmisión requerida." }]}
    >
      <Select
        placeholder="selecciona una transmisión"
        options={dropTransmition}
      />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Estatus"
      name="status"
      rules={[{ required: true, message: "Estatus requerido." }]}
    >
      <Select placeholder="selecciona un estatus" options={dropStatus} />
    </Form.Item>
    <Form.Item<IVehicle>
      label="Categoría"
      name="category"
      rules={[{ required: true, message: "Categoría requerido." }]}
    >
      <Select placeholder="selecciona una categoría" options={dropCategory} />
    </Form.Item>
    {action === ActionEnum.ADD && (
      <Form.Item<IVehicle>
        label="Imagen"
        getValueFromEvent={({ file }) => file.originFileObj}
        name="image"
        rules={[{ required: true, message: "Imagen requerido." }]}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Subir</Button>
        </Upload>
      </Form.Item>
    )}
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
