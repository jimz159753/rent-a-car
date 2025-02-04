import {
    DeleteOutlined,
    EditOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { IClient } from "./interfaces/client.interface";
import { Popconfirm } from "antd";

interface ColumnsProps {
    rowUpdateDrawer: (idx: number, id: string) => void;
    deleteClient: (id: string) => void;
}

export const columns = ({ rowUpdateDrawer, deleteClient }: ColumnsProps) => [
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
                    onClick={() => item._id && rowUpdateDrawer(idx, item._id)}
                />
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => item._id && deleteClient(item._id)}
                    description="¿Seguro que quieres borrar este registro?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                    <DeleteOutlined style={{ color: "#E74E4E" }} />
                </Popconfirm>
            </div>
        ),
    },
];
