'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { UserForm } from './form/form'
import { ActionEnum, FieldType, IUser, RoleEnum } from './interfaces/user.interface'
import './page.css'
import { addUser, getUsers, removeUser, updateUser } from './actions/actions'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Spin, Table, Tag } from 'antd'

const Clients = () => {
    const [data, setData] = useState<IUser[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [role, setRole] = useState<RoleEnum>(RoleEnum.EMPLOYEE)
    const [password, setPassword] = useState<string>('')
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const [form] = Form.useForm()

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Correo eléctronico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => <Tag color={role === RoleEnum.ADMIN ? 'geekblue' : 'green'}>{role}</Tag>
        },
        {
            title: 'Fecha',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Acción',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: string, item: IUser, idx: number) => <div className='flex justify-between'>
                <EditOutlined style={{ color: '#6582EB' }} onClick={() => rowUpdateDrawer(idx, item._id)} />
                <DeleteOutlined style={{ color: '#E74E4E' }} onClick={() => deleteUser(item._id)} />
            </div>
        },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { name, email, phone, address, role } = data[index]
            setId(id)
            form.setFieldsValue({
                name,
                email,
                phone,
                address,
                role
            })
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        form.resetFields()
        setOpen(true)
    }

    const registerUser = async (user: FieldType) => {
        await addUser(user)
        await loadUsers()
    }

    const loadUsers = async () => {
        const data = await getUsers()
        setData(data)
    }

    const editUser = async (id: string, updatedUser: FieldType) => {
        await updateUser(id, updatedUser)
        await loadUsers()
    }

    const deleteUser = async (id: string) => {
        await removeUser(id)
        await loadUsers()
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const onClose = () => {
        setOpen(false)
    }

    const handleAction = (values: FieldType) => {
        const user = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            role: values.role,
            password: values.password
        }
        if (action === ActionEnum.ADD) {
            registerUser(user)
            form.resetFields()
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setRole(RoleEnum.EMPLOYEE)
            setPassword('')
        } else {
            editUser(id, user)
        }
    }

    return (
        <Dashboard>
            <div>
                <Button className='my-8 border' onClick={rowAddDrawer}>Agregar</Button>
                {data ? <Table columns={columns} dataSource={data} /> :
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                }
            </div>
            <Drawer
                open={isOpen}
                onClose={onClose}
                title={action === ActionEnum.ADD ? 'Agregar Usuario' : 'Actualizar Usuario'} >
                <UserForm
                    setOpen={setOpen}
                    name={name}
                    email={email}
                    phone={phone}
                    address={address}
                    role={role}
                    action={action}
                    handleAction={handleAction}
                    form={form}
                />
            </Drawer>
        </Dashboard >
    )
}

export default Clients