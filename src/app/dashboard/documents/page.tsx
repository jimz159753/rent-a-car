'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { ActionEnum, FieldType, IClient, IDocument, IVehicle } from './interfaces/document.interface'
import { addDocument, getDocuments, removeDocument, updateDocument, getClients, getVehicles } from './actions/actions'
import { DocumentForm } from './form/form'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Spin, Table } from 'antd'

const Documents = () => {
    const [data, setData] = useState<IDocument[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
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
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: '_id',
            render: (client: IClient, item: IDocument) => <p>{item.client.name}</p>
        },
        {
            title: 'Vehículo',
            dataIndex: 'vehicle',
            key: '_id',
            render: (vehicle: IVehicle, item: IDocument) => <p>{item.vehicle.model}</p>
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
            render: (timestamp: string, item: IDocument, idx: number) => <div className='flex justify-between'>
                <EditOutlined style={{ color: '#6582EB' }} onClick={() => rowUpdateDrawer(idx, item._id)} />
                <DeleteOutlined style={{ color: '#E74E4E' }} onClick={() => deleteDocument(item._id)} />
            </div>
        },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { name, client, vehicle } = data[index]
            setId(id)
            form.setFieldsValue({
                name,
                client: client.name,
                vehicle: vehicle.model,
            })
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        form.resetFields()
        setOpen(true)
    }

    const loadDocuments = async () => {
        const response = await getDocuments()
        const data = response.map((el: IDocument) => ({ ...el, key: el._id }))
        setData(data)
    }

    const registerDocument = async (document: FieldType) => {
        await addDocument(document)
        await loadDocuments()
    }

    const editDocument = async (id: string, updatedDocument: FieldType) => {
        await updateDocument(id, updatedDocument)
        await loadDocuments()
    }

    const deleteDocument = async (id: string) => {
        await removeDocument(id)
        await loadDocuments()
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
        loadDocuments()
        loadDropdrowns()
    }, [])

    const onClose = () => {
        setOpen(false)
    }

    const handleAction = (values: FieldType) => {
        const document = {
            name: values.name,
            client: values.client,
            vehicle: values.vehicle,
        }

        if (action === ActionEnum.ADD) {
            registerDocument(document)
            form.resetFields()
            setName('')
            setClient('')
            setVehicle('')
        } else {
            editDocument(id, document)
        }
    }

    return (
        <Dashboard>
            <div>
                <Button onClick={rowAddDrawer}>Agregar</Button>
                {data ? <Table columns={columns} dataSource={data} /> :
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                }
            </div>
            <Drawer
                open={isOpen}
                onClose={onClose}
                title={action === ActionEnum.ADD ?
                    'Agregar Documento'
                    :
                    'Actualizar Documento'}
            >
                {dropClients && dropVehicles &&
                    <DocumentForm
                        form={form}
                        handleAction={handleAction}
                        setOpen={setOpen}
                        name={name}
                        client={client}
                        vehicle={vehicle}
                        action={action}
                        dropClients={dropClients}
                        dropVehicles={dropVehicles}
                    />}
            </Drawer>
        </Dashboard >
    )
}

export default Documents