import Link from "next/link";
import { IVehicle, StatusEnum } from "./interfaces/vehicle.interface";
import { Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";

interface ColumnsProps {
    rowUpdateDrawer: (index: number, id: string) => void;
    deleteVehicle: (id: string) => void;
}
export const columns = ({ rowUpdateDrawer, deleteVehicle }: ColumnsProps) => [
    {
        title: "Id",
        dataIndex: "_id",
        key: "_id",
    },
    {
        title: "Modelo",
        dataIndex: "model",
        key: "model",
        render: (model: string, item: IVehicle) => (
            <Link target="_blank" href={`${process.env.FILES_URL}${item.image}`}>
                {model}
            </Link>
        ),
    },
    {
        title: "Categoría",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Marca",
        dataIndex: "brand",
        key: "brand",
    },
    {
        title: "Placa",
        dataIndex: "plate",
        key: "plate",
    },
    {
        title: "Precio",
        dataIndex: "price",
        key: "price",
        render: (price: string) => (
            <p>${price ? Intl.NumberFormat().format(Number(price)) : 0}</p>
        ),
    },
    {
        title: "Estatus",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
            <Tag color={status === StatusEnum.AVAILABLE ? "geekblue" : "red"}>
                {status}
            </Tag>
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
        render: (timestamp: string, item: IVehicle, idx: number) => (
            <div className="flex justify-between">
                <EditOutlined
                    style={{ color: "#6582EB" }}
                    onClick={() => item._id && rowUpdateDrawer(idx, item._id)}
                />
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => item._id && deleteVehicle(item._id)}
                    description="¿Seguro que quieres borrar este registro?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                    <DeleteOutlined style={{ color: "#E74E4E" }} />
                </Popconfirm>
            </div>
        ),
    },
];