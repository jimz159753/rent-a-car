"use client";
import React, { useEffect, useState } from "react";
import { UserForm } from "./form/form";
import {
  ActionEnum,
  IUser,
} from "./interfaces/user.interface";
import { addUser, getUsers, removeUser, updateUser } from "./actions/actions";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Spin,
  Table,
  message,
} from "antd";
import "./page.css";
import { columns } from "./columns";

const Clients = () => {
  const [data, setData] = useState<IUser[]>();
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD);
  const [form] = Form.useForm();
  const [userStringObj, setUserStringObj] = useState("");
  const user: IUser = userStringObj && JSON.parse(userStringObj);

  const rowUpdateDrawer = (index: number, id: string) => {
    setAction(ActionEnum.UPDATE);
    if (data) {
      const { name, email, phone, address, role } = data[index];
      setId(id);
      setEmail(email);
      form.setFieldsValue({
        name,
        email,
        phone,
        address,
        role,
      });
    }
    setOpen(true);
  };

  const rowAddDrawer = () => {
    setAction(ActionEnum.ADD);
    setEmail("");
    form.resetFields();
    setOpen(true);
  };

  const registerUser = async (user: IUser) => {
    await addUser(user);
    await loadUsers();
  };

  const loadUsers = async () => {
    const response = await getUsers();
    const data = response.map((el: IUser) => ({ ...el, key: el._id }));
    setData(data);
  };

  const editUser = async (id: string, updatedUser: IUser) => {
    await updateUser(id, updatedUser);
    await loadUsers();
  };

  const deleteUser = async (id: string) => {
    await removeUser(id);
    await loadUsers();
  };

  useEffect(() => {
    loadUsers();
    const user = localStorage.getItem("user");
    if (user) setUserStringObj(user);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const handleAction = (values: IUser) => {
    const user = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      role: values.role,
      password: values.password,
    };
    if (action === ActionEnum.ADD) {
      registerUser(user);
      form.resetFields();
      message.success("Datos agregados");
    } else {
      editUser(id, user);
      message.success("Datos actualizados");
    }
  };

  return (
    <div className="administration-content">
      {data ? (
        <div>
          <Button className="add-btn" onClick={rowAddDrawer}>
            Agregar
          </Button>
          <Table columns={columns({ rowUpdateDrawer, deleteUser })} dataSource={data} />
        </div>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
      <Drawer
        open={isOpen}
        onClose={onClose}
        title={
          action === ActionEnum.ADD ? "Agregar Usuario" : "Actualizar Usuario"
        }
      >
        <UserForm
          setOpen={setOpen}
          email={email}
          action={action}
          handleAction={handleAction}
          form={form}
          user={user}
        />
      </Drawer>
    </div>
  );
};

export default Clients;
