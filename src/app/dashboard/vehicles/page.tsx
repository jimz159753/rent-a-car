"use client";
import React, { useEffect, useState } from "react";
import {
  ActionEnum,
  IVehicle,
  TypeVehicle,
} from "./interfaces/vehicle.interface";
import { VehicleForm } from "./form/form";
import {
  addVehicle,
  getVehicles,
  removeVehicle,
  updateVehicle,
} from "./actions/actions";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Drawer,
  Spin,
  Table,
  Form,
  Button,
  message,
} from "antd";
import "./page.css";
import { columns } from "./columns";

const Vehicles = () => {
  const [data, setData] = useState<IVehicle[]>();
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD);
  const [form] = Form.useForm();

  const rowUpdateDrawer = (index: number, id: string) => {
    setAction(ActionEnum.UPDATE);
    if (data) {
      const {
        model,
        category,
        brand,
        plate,
        price,
        status,
        type,
        people,
        doors,
        suitcases,
        bags,
        transmition,
        ac,
      } = data[index];
      setId(id);
      form.setFieldsValue({
        type,
        people,
        doors,
        suitcases,
        bags,
        transmition,
        ac,
        model,
        category,
        brand,
        plate,
        price,
        status,
      });
    }
    setOpen(true);
  };

  const rowAddDrawer = () => {
    setAction(ActionEnum.ADD);
    form.resetFields();
    setOpen(true);
  };

  const registerVehicle = async (vehicle: TypeVehicle) => {
    await addVehicle(vehicle);
    await loadVehicles();
  };

  const loadVehicles = async () => {
    const response = await getVehicles();
    const data = response.map((el: IVehicle) => ({ ...el, key: el._id }));
    setData(data);
  };

  const editVehicle = async (id: string, updatedVehicle: TypeVehicle) => {
    await updateVehicle(id, updatedVehicle);
    await loadVehicles();
  };

  const deleteVehicle = async (id: string) => {
    await removeVehicle(id);
    await loadVehicles();
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const handleAction = (values: TypeVehicle) => {
    const vehicle = {
      type: values.type,
      ac: values.ac,
      people: values.people,
      doors: values.doors,
      suitcases: values.suitcases,
      bags: values.bags,
      transmition: values.transmition,
      model: values.model,
      category: values.category,
      brand: values.brand,
      plate: values.plate,
      price: values.price,
      status: values.status,
      image: values.image,
    };
    if (action === ActionEnum.ADD) {
      registerVehicle(vehicle);
      form.resetFields();
      message.success("Datos agregados");
    } else {
      editVehicle(id, vehicle);
      message.success("Datos actualizados");
    }
  };

  return (
    <div className="vehicles-content">
      {data ? (
        <div>
          <Button className="add-btn" onClick={rowAddDrawer}>
            Agregar
          </Button>
          <Table columns={columns({ rowUpdateDrawer, deleteVehicle })} dataSource={data} />
        </div>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
      <Drawer
        open={isOpen}
        onClose={onClose}
        title={
          action === ActionEnum.ADD ? "Agregar Vehículo" : "Actualizar Vehículo"
        }
      >
        <VehicleForm
          setOpen={setOpen}
          action={action}
          handleAction={handleAction}
          form={form}
        />
      </Drawer>
    </div>
  );
};

export default Vehicles;
