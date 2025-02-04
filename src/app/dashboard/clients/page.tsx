"use client";
import React, { useEffect, useState } from "react";
import { ClientForm } from "./form/form";
import { ActionEnum, IClient } from "./interfaces/client.interface";
import {
  addClient,
  getClients,
  removeClient,
  updateClient,
} from "./actions/actions";
import { Button, Drawer, Spin, Table, Form, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./page.css";
import dayjs from "dayjs";
import { columns } from "./columns";

const Clients = () => {
  const [data, setData] = useState<IClient[]>();
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD);
  const [form] = Form.useForm();

  useEffect(() => {
    loadClients();
  }, []);

  const rowUpdateDrawer = (index: number, id: string) => {
    setAction(ActionEnum.UPDATE);
    if (data) {
      const { name, phone, address, email, birthday, country } = data[index];
      const birthdayObj = dayjs(birthday);
      setId(id);
      form.setFieldsValue({
        name,
        phone,
        address,
        email,
        birthday: birthdayObj,
        country,
      });
    }
    setOpen(true);
  };

  const rowAddDrawer = () => {
    setAction(ActionEnum.ADD);
    form.resetFields();
    setOpen(true);
  };

  const registerClient = async (client: IClient) => {
    await addClient(client);
    await loadClients();
  };

  const loadClients = async () => {
    const response = await getClients();
    const data = response.map((el: IClient) => ({ ...el, key: el._id }));
    setData(data);
  };

  const editClient = async (id: string, updatedClient: IClient) => {
    await updateClient(id, updatedClient);
    await loadClients();
  };

  const deleteClient = async (id: string) => {
    await removeClient(id);
    await loadClients();
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleAction = (client: IClient) => {
    if (action === ActionEnum.ADD) {
      registerClient(client);
      form.resetFields();
      message.success("Datos agregados");
    } else {
      editClient(id, client);
      message.success("Datos actualizados");
    }
  };

  return (
    <div className="clients-content">
      {data ? (
        <div>
          <Button className="add-btn" onClick={rowAddDrawer}>
            Agregar
          </Button>
          <Table
            columns={columns({ rowUpdateDrawer, deleteClient })}
            dataSource={data}
          />
        </div>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
      <Drawer
        open={isOpen}
        onClose={onClose}
        title={
          action === ActionEnum.ADD ? "Agregar Cliente" : "Actualizar Cliente"
        }
      >
        <ClientForm
          setOpen={setOpen}
          action={action}
          handleAction={handleAction}
          form={form}
        />
      </Drawer>
    </div>
  );
};

export default Clients;
