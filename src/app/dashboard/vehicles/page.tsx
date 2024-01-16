'use client'
import React, { useEffect, useState } from 'react'
import { ActionEnum, CategoryEnum, FieldType, IVehicle, StatusEnum } from './interfaces/vehicle.interface'
import { VehicleForm } from './form/form'
import { addVehicle, getVehicles, removeVehicle, updateVehicle } from './actions/actions'
import { DeleteOutlined, EditOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Drawer, Spin, Table, Form, Tag, Button, message, Popconfirm } from 'antd'
import Link from 'next/link'
import './page.css'

const Vehicles = () => {
    const [data, setData] = useState<IVehicle[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [plate, setPlate] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.AVAILABLE)
    const [category, setCategory] = useState<CategoryEnum>(CategoryEnum.SEDAN)
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const [form] = Form.useForm()

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Modelo',
            dataIndex: 'model',
            key: 'model',
            render: (model: string, item: IVehicle) => <Link target="_blank" href={`${process.env.FILES_URL}${item.image}`}>{model}</Link>
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Marca',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Placa',
            dataIndex: 'plate',
            key: 'plate',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={status === StatusEnum.AVAILABLE ? 'geekblue' : 'red'}>{status}</Tag>
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
            render: (timestamp: string, item: IVehicle, idx: number) => <div className='flex justify-between'>
                <EditOutlined style={{ color: '#6582EB' }} onClick={() => rowUpdateDrawer(idx, item._id)} />
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => deleteVehicle(item._id)}
                    description="¿Seguro que quieres borrar este registro?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }}
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
            const { model, category, brand, plate, price, status } = data[index]
            setId(id)
            form.setFieldsValue({
                model,
                category,
                brand,
                plate,
                price,
                status
            })
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        form.resetFields()
        setOpen(true)
    }

    const registerVehicle = async (vehicle: FieldType) => {
        await addVehicle(vehicle)
        await loadVehicles()
    }

    const loadVehicles = async () => {
        const response = await getVehicles()
        const data = response.map((el: IVehicle) => ({ ...el, key: el._id }))
        setData(data)
    }

    const editVehicle = async (id: string, updatedVehicle: FieldType) => {
        await updateVehicle(id, updatedVehicle)
        await loadVehicles()
    }

    const deleteVehicle = async (id: string) => {
        await removeVehicle(id)
        await loadVehicles()
    }

    useEffect(() => {
        loadVehicles()
    }, [])

    const onClose = () => {
        setOpen(false)
    }

    const handleAction = (values: FieldType) => {
        const vehicle = {
            model: values.model,
            category: values.category,
            brand: values.brand,
            plate: values.plate,
            price: values.price,
            status: values.status,
            image: values.image
        }
        if (action === ActionEnum.ADD) {
            registerVehicle(vehicle)
            form.resetFields()
            setModel('')
            setCategory(CategoryEnum.SEDAN)
            setBrand('')
            setPlate('')
            setPrice('')
            setStatus(StatusEnum.AVAILABLE)
            message.success('Datos agregados')
        } else {
            editVehicle(id, vehicle)
            message.success('Datos actualizados')
        }
    }


    return (
        <div className='vehicles-content'>
            {data ?
                <div>
                    <Button className='add-btn' onClick={rowAddDrawer}>Agregar</Button>
                    <Table columns={columns} dataSource={data} />
                </div>
                :
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
            <Drawer open={isOpen} onClose={onClose} title={action === ActionEnum.ADD ? 'Agregar Vehículo' : 'Actualizar Vehículo'} >
                <VehicleForm
                    setOpen={setOpen}
                    action={action}
                    handleAction={handleAction}
                    form={form}
                    model={model}
                    brand={brand}
                    plate={plate}
                    price={price}
                    status={status}
                    category={category}
                />
            </Drawer>
        </div>
    )
}

export default Vehicles