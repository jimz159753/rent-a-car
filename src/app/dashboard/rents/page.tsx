'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { ActionEnum, FieldType, IClient, IRent, IVehicle } from './interfaces/rent.interface'
import { RentForm } from './form/form'
import { addRent, getClients, getRents, getVehicles, removeRent, updateRent } from './actions/actions'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Spin, Table } from 'antd'

const Rent = () => {
    const [data, setData] = useState<IRent[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [days, setDays] = useState<string>('')
    const [payment, setPayment] = useState<string>('')
    const [total, setTotal] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [client, setClient] = useState<string>('')
    const [vehicle, setVehicle] = useState<string>('')
    const [dropClients, setDropClients] = useState<IClient[]>([])
    const [dropVehicles, setDropVehicles] = useState<IVehicle[]>([])
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const [form] = Form.useForm()

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: '_id',
            render: (client: IClient, item: IRent) => <p>{item.client.name}</p>
        },
        {
            title: 'Vehículo',
            dataIndex: 'vehicle',
            key: '_id',
            render: (vehicle: IVehicle, item: IRent) => <p>{item.vehicle.model}</p>
        },
        {
            title: 'Dias',
            dataIndex: 'days',
            key: 'days',
        },
        {
            title: 'Anticipo',
            dataIndex: 'payment',
            key: 'payment',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
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
            render: (timestamp: string, item: IRent, idx: number) => <div className='flex justify-between'>
                <EditOutlined style={{ color: '#6582EB' }} onClick={() => rowUpdateDrawer(idx, item._id)} />
                <DeleteOutlined style={{ color: '#E74E4E' }} onClick={() => deleteRent(item._id)} />
            </div>
        },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { client, vehicle, days, payment, total, description } = data[index]
            setId(id)
            form.setFieldsValue({
                client: client.name,
                vehicle: vehicle.model,
                days,
                payment,
                total,
                description
            })
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        form.resetFields()
        setOpen(true)
    }

    const loadRents = async () => {
        const response = await getRents()
        const data = response.map((el: IRent) => ({ ...el, key: el._id }))
        setData(data)
    }

    const registerRent = async (document: FieldType) => {
        await addRent(document)
        await loadRents()
    }

    const editRent = async (id: string, updatedRent: FieldType) => {
        await updateRent(id, updatedRent)
        await loadRents()
    }

    const deleteRent = async (id: string) => {
        await removeRent(id)
        await loadRents()
    }

    const loadDropdrowns = async () => {
        const clients = await getClients()
        const vehicles = await getVehicles()
        const clientOptions = clients.map((el: IClient) => ({ value: JSON.stringify(el), label: el.name }))
        const vehicleOptions = vehicles.map((el: IVehicle) => ({ value: JSON.stringify(el), label: el.brand }))
        setDropClients(clientOptions)
        setDropVehicles(vehicleOptions)
    }

    useEffect(() => {
        loadRents()
        loadDropdrowns()
    }, [])

    const onClose = () => {
        setOpen(false)
    }

    const handleAction = (values: FieldType) => {
        const clientObj = JSON.parse(values.client)
        const vehicleObj = JSON.parse(values.vehicle)
        const rent = {
            client: clientObj,
            vehicle: vehicleObj,
            days: values.days,
            payment: values.payment,
            total: values.total,
            description: values.description
        }

        if (action === ActionEnum.ADD) {
            registerRent(rent)
            form.resetFields()
            setClient('')
            setVehicle('')
            setDays('')
            setPayment('')
            setTotal('')
            setDescription('')
            setOpen(false)
        } else {
            editRent(id, rent)
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
                title={action === ActionEnum.ADD ?
                    'Agregar Alquiler'
                    :
                    'Actualizar Alquiler'}
            >
                {dropClients && dropVehicles &&
                    <RentForm
                        handleAction={handleAction}
                        setOpen={setOpen}
                        client={client}
                        vehicle={vehicle}
                        days={days}
                        payment={payment}
                        total={total}
                        description={description}
                        action={action}
                        dropClients={dropClients}
                        dropVehicles={dropVehicles}
                        form={form}
                    />}
            </Drawer>
        </Dashboard >
    )
}

export default Rent