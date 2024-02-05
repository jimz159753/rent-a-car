'use client'
import React, { useEffect, useState } from 'react'
import { ActionEnum, FieldType, IDocument } from './interfaces/document.interface'
import { addDocument, getDocuments, removeDocument, updateDocument, getRents } from './actions/actions'
import { DocumentForm } from './form/form'
import { DeleteOutlined, EditOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Popconfirm, Spin, Table, message } from 'antd'
import { IRent } from '../rents/interfaces/rent.interface'
import Link from 'next/link'
import './page.css'

const Documents = () => {
    const [data, setData] = useState<IDocument[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [rent, setRent] = useState<string>('')
    const [dropRents, setDropRents] = useState<IRent[]>([])
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
            render: (name: string) => <Link target="_blank" href={process.env.FILES_URL + name}>{name}</Link>
        },
        {
            title: 'Cliente',
            dataIndex: '_id',
            key: '_id',
            render: (id: string, item: IDocument) => <p>{item.rent.client.name}</p>

        },
        {
            title: 'Vehículo',
            dataIndex: '_id',
            key: '_id',
            render: (id: string, item: IDocument) => <p>{item.rent.vehicle.brand} {item.rent.vehicle.plate}</p>
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
                <Popconfirm
                    title="Borrar registro"
                    okText="Si"
                    cancelText="No"
                    onConfirm={() => deleteDocument(item._id)}
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
            const { rent } = data[index]
            setId(id)
            form.setFieldsValue({
                rent: rent.client.email
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
        const rents = await getRents()
        const rentsOptions = rents.map((el: IRent) => ({ value: JSON.stringify(el), label: el.client.email }))
        setDropRents(rentsOptions)
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
            rent: values.rent,
            document: values.document
        }

        if (action === ActionEnum.ADD) {
            registerDocument(document)
            form.resetFields()
            setRent('')
            message.success('Datos agregados')
        } else {
            editDocument(id, document)
            message.success('Datos actualizados')
        }
    }

    return (
        <div className='documents-content'>
            {data ?
                <div>
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
                    'Agregar Documento'
                    :
                    'Actualizar Documento'}
            >
                {dropRents &&
                    <DocumentForm
                        form={form}
                        handleAction={handleAction}
                        setOpen={setOpen}
                        action={action}
                        dropRents={dropRents}
                        rent={rent}
                    />}
            </Drawer>
        </div >
    )
}

export default Documents