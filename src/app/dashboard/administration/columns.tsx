import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { IUser, RoleEnum } from "./interfaces/user.interface";
import { Popconfirm, Tag } from 'antd';

interface ColumnsProps {
    rowUpdateDrawer: (idx: number, id: string) => void
    deleteUser: (id: string) => void
}
export const columns = ({ rowUpdateDrawer, deleteUser }: ColumnsProps) => [
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
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role: string) => (
            <Tag color={role === RoleEnum.ADMIN ? "geekblue" : "green"}>{role}</Tag>
        ),
    },
    {
        title: "Fecha",
        dataIndex: "timestamp",
        key: "timestamp",
    },
    {
        title: "Acción",
        render: (password: string, item: IUser, idx: number) => (
            <div className="flex justify-between">
                <EditOutlined
                    style={{ color: "#6582EB" }}
                    onClick={() => item._id && rowUpdateDrawer(idx, item._id)}
                />
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => item._id && deleteUser(item._id)}
                    description="¿Seguro que quieres borrar este registro?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                    <DeleteOutlined style={{ color: "#E74E4E" }} />
                </Popconfirm>
            </div>
        ),
    },
];