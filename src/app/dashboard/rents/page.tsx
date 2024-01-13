'use client'
import React, { useEffect, useState } from 'react'
import { ActionEnum, FieldType, IClient, IRent, IVehicle, StatusEnum } from './interfaces/rent.interface'
import { RentForm } from './form/form'
import { addRent, getClients, getRents, getVehicles, removeRent, updateVehicle, updateRent } from './actions/actions'
import { CheckOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, QuestionCircleOutlined, RollbackOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Popconfirm, Spin, Table, message } from 'antd'
import './page.css'

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
            title: 'Alquilar',
            dataIndex: 'vehicle',
            key: '_id',
            render: (vehicle: IVehicle, item: IRent) => <div className='text-center'>
                {vehicle.status === StatusEnum.AVAILABLE ?
                    <CheckOutlined onClick={() => rentVehicle(item._id, item)} style={{ color: '#6582EB' }} />
                    :
                    <RollbackOutlined onClick={() => rentVehicle(item._id, item)} style={{ color: '#E74E4E' }} />
                }
            </div>
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: '_id',
            render: (client: IClient) => <p>{client.name}</p>
        },
        {
            title: 'Vehículo',
            dataIndex: 'vehicle',
            key: '_id',
            render: (vehicle: IVehicle) => <p>{vehicle.model}</p>
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
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => deleteRent(item._id)}
                    description="¿Seguro que quieres borrar este registro?"
                    icon={<QuestionCircleOutlined style={{ color: '#E74E4E' }}
                    />}
                >
                    <DeleteOutlined style={{ color: '#E74E4E' }} />
                </Popconfirm>
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

    const rentVehicle = async (id: string, item: IRent) => {
        const status = item.vehicle.status === StatusEnum.AVAILABLE ? StatusEnum.RENTED : StatusEnum.AVAILABLE
        const updatedVehicle = { ...item.vehicle, status }
        const updatedRent = { ...item, vehicle: updatedVehicle }
        await updateVehicle(item.vehicle._id, updatedVehicle)
        await editRent(id, updatedRent)
        await loadRents()
        message.success(status === StatusEnum.AVAILABLE ? 'Vehículo devuelto' : 'Vehículo alquilado')
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
        const clientObj = JSON.parse(values.client as string)
        const vehicleObj = JSON.parse(values.vehicle as string)
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
            message.success('Datos agregados')
        } else {
            editRent(id, rent)
            message.success('Datos actualizados')
        }
    }

    return (
        <div className='rents-content'>
            {data ? <div>
                <Button className='add-btn' onClick={rowAddDrawer}>Agregar</Button>
                <Table columns={columns} dataSource={data} />
            </div>
                :
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
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
        </div >
    )
}

export default Rent