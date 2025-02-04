"use client";
import React, { useEffect, useState } from "react";
import {
  ActionEnum,
  IDocument,
} from "./interfaces/document.interface";
import {
  addDocument,
  getDocuments,
  removeDocument,
  updateDocument,
  getRents,
} from "./actions/actions";
import { DocumentForm } from "./form/form";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Spin, Table, message } from "antd";
import { IRent } from "../rents/interfaces/rent.interface";
import "./page.css";
import { columns } from "./columns";

const Documents = () => {
  const [data, setData] = useState<IDocument[]>();
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [dropRents, setDropRents] = useState<IRent[]>([]);
  const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD);
  const [form] = Form.useForm();

  const rowUpdateDrawer = (index: number, id: string) => {
    setAction(ActionEnum.UPDATE);
    if (data) {
      const { rent } = data[index];
      setId(id);
      form.setFieldsValue({
        rent: rent.client.email,
      });
    }
    setOpen(true);
  };

  const rowAddDrawer = () => {
    setAction(ActionEnum.ADD);
    form.resetFields();
    setOpen(true);
  };

  const loadDocuments = async () => {
    const response = await getDocuments();
    const data = response.map((el: IDocument) => ({ ...el, key: el._id }));
    setData(data);
  };

  const registerDocument = async (document: IDocument) => {
    await addDocument(document);
    await loadDocuments();
  };

  const editDocument = async (id: string, updatedDocument: IDocument) => {
    await updateDocument(id, updatedDocument);
    await loadDocuments();
  };

  const deleteDocument = async (id: string) => {
    await removeDocument(id);
    await loadDocuments();
  };

  const loadDropdrowns = async () => {
    const rents = await getRents();
    const rentsOptions = rents.map((el: IRent) => ({
      value: JSON.stringify(el),
      label: el.client.email,
    }));
    setDropRents(rentsOptions);
  };

  useEffect(() => {
    loadDocuments();
    loadDropdrowns();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const handleAction = (values: IDocument) => {
    const document = {
      rent: values.rent,
      document: values.document,
    };

    if (action === ActionEnum.ADD) {
      registerDocument(document);
      form.resetFields();
      message.success("Datos agregados");
    } else {
      editDocument(id, document);
      message.success("Datos actualizados");
    }
  };

  return (
    <div className="documents-content">
      {data ? (
        <div>
          <Button className="add-btn" onClick={rowAddDrawer}>
            Agregar
          </Button>
          <Table columns={columns({ rowUpdateDrawer, deleteDocument })} dataSource={data} />
        </div>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
      <Drawer
        open={isOpen}
        onClose={onClose}
        title={
          action === ActionEnum.ADD
            ? "Agregar Documento"
            : "Actualizar Documento"
        }
      >
        {dropRents && (
          <DocumentForm
            form={form}
            handleAction={handleAction}
            setOpen={setOpen}
            action={action}
            dropRents={dropRents}
          />
        )}
      </Drawer>
    </div>
  );
};

export default Documents;
