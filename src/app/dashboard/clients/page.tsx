'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../layout'
import { ClientForm } from './form/form'
import { ActionEnum, FieldType, IClient } from './interfaces/client.interface'
import { addClient, getClients, removeClient, updateClient } from './actions/actions'
import { Button, Drawer, Image, Spin, Table, Form } from 'antd'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import './page.css'

const Clients = () => {
    const [data, setData] = useState<IClient[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [dni, setDni] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const [form] = Form.useForm()


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Dni',
            dataIndex: 'dni',
            key: 'dni',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Fecha',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Acción',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: string, item: IClient, idx: number) => <div className='flex justify-between'>
                <EditOutlined style={{ color: '#6582EB' }} onClick={() => rowUpdateDrawer(idx, item._id)} />
                <DeleteOutlined style={{ color: '#E74E4E' }} onClick={() => deleteClient(item._id)} />
            </div>
        },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { dni, name, phone, address } = data[index]
            setId(id)
            form.setFieldsValue({
                dni,
                name,
                phone,
                address
            })
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        form.resetFields()
        setOpen(true)
    }

    const registerClient = async (client: FieldType) => {
        await addClient(client)
        await loadClients()
    }

    const loadClients = async () => {
        const response = await getClients()
        const data = response.map((el: IClient) => ({ ...el, key: el._id }))
        setData(data)
    }

    const editClient = async (id: string, updatedClient: FieldType) => {
        await updateClient(id, updatedClient)
        await loadClients()
    }

    const deleteClient = async (id: string) => {
        await removeClient(id)
        await loadClients()
    }

    useEffect(() => {
        loadClients()
    }, [])

    const onClose = () => {
        setOpen(false)
    }

    const handleAction = (values: FieldType) => {
        const client = {
            dni: values.dni,
            name: values.name,
            phone: values.phone,
            address: values.address
        }
        if (action === ActionEnum.ADD) {
            registerClient(client)
            form.resetFields()
            setDni('')
            setName('')
            setPhone('')
            setAddress('')
        } else {
            editClient(id, client)
        }
    }

    return (
        <div>
            {data ?
                <div>
                    <Button className='my-8 border' onClick={rowAddDrawer}>Agregar</Button>
                    <Table columns={columns} dataSource={data} />
                </div>
                :
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
            <Drawer open={isOpen} onClose={onClose} title={action === ActionEnum.ADD ? 'Agregar Cliente' : 'Actualizar Cliente'} >
                <ClientForm
                    setOpen={setOpen}
                    action={action}
                    handleAction={handleAction}
                    form={form}
                    dni={dni}
                    name={name}
                    phone={phone}
                    address={address}
                />
            </Drawer>
        </div >
    )
}

export default Clients