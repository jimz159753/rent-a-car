import Link from "next/link";
import { IDocument } from "./interfaces/document.interface";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

interface ColumnsProps {
    rowUpdateDrawer: (index: number, id: string) => void;
    deleteDocument: (id: string) => void;
}

export const columns = ({ rowUpdateDrawer, deleteDocument }: ColumnsProps) => [
    {
        title: "Id",
        dataIndex: "_id",
        key: "_id",
    },
    {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
        render: (name: string) => (
            <Link target="_blank" href={process.env.FILES_URL + name}>
                {name}
            </Link>
        ),
    },
    {
        title: "Cliente",
        dataIndex: "_id",
        key: "_id",
        render: (id: string, item: IDocument) => <p>{item.rent.client.name}</p>,
    },
    {
        title: "Vehículo",
        dataIndex: "_id",
        key: "_id",
        render: (id: string, item: IDocument) => (
            <p>
                {item.rent.vehicle.brand} {item.rent.vehicle.plate}
            </p>
        ),
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
        render: (timestamp: string, item: IDocument, idx: number) => (
            <div className="flex justify-between">
                <EditOutlined
                    style={{ color: "#6582EB" }}
                    onClick={() => item._id && rowUpdateDrawer(idx, item._id)}
                />
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => item._id && deleteDocument(item._id)}
                    description="¿Seguro que quieres borrar este registro?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                    <DeleteOutlined style={{ color: "#E74E4E" }} />
                </Popconfirm>
            </div>
        ),
    },
];