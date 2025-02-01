"use client";
import React, { useEffect, useState } from "react";
import { ClientForm } from "./form/form";
import { ActionEnum, FieldType, IClient } from "./interfaces/client.interface";
import {
  addClient,
  getClients,
  removeClient,
  updateClient,
} from "./actions/actions";
import {
  Button,
  Drawer,
  Image,
  Spin,
  Table,
  Form,
  message,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./page.css";
import dayjs from "dayjs";

const Clients = () => {
  const [data, setData] = useState<IClient[]>();
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Correo eléctronico",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Fecha",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Acción",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: string, item: IClient, idx: number) => (
        <div className="flex justify-between">
          <EditOutlined
            style={{ color: "#6582EB" }}
            onClick={() => rowUpdateDrawer(idx, item._id)}
          />
          <Popconfirm
            title="Borrar registro"
            okText="Si"
            cancelText="No"
            onConfirm={() => deleteClient(item._id)}
            description="¿Seguro que quieres borrar este registro?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined style={{ color: "#E74E4E" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

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

  const registerClient = async (client: FieldType) => {
    await addClient(client);
    await loadClients();
  };

  const loadClients = async () => {
    const response = await getClients();
    const data = response.map((el: IClient) => ({ ...el, key: el._id }));
    setData(data);
  };

  const editClient = async (id: string, updatedClient: FieldType) => {
    await updateClient(id, updatedClient);
    await loadClients();
  };

  const deleteClient = async (id: string) => {
    await removeClient(id);
    await loadClients();
  };

  useEffect(() => {
    loadClients();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const handleAction = (values: FieldType) => {
    const client = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      email: values.email,
      birthday: values.birthday,
      country: values.country,
    };
    if (action === ActionEnum.ADD) {
      registerClient(client);
      form.resetFields();
      setName("");
      setPhone("");
      setAddress("");
      setEmail("");
      setBirthday("");
      setCountry("");
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
          <Table columns={columns} dataSource={data} />
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
          name={name}
          phone={phone}
          address={address}
          email={email}
          birthday={birthday}
          country={country}
        />
      </Drawer>
    </div>
  );
};

export default Clients;
