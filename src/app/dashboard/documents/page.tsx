'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { Drawer } from '@/app/components/ui/Drawer'
import { ActionEnum, IClient, IDocument, IVehicle } from './interfaces/document.interface'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import { ListTable } from '@/app/components/ui/ListTable'
import { addDocument, getDocuments, removeDocument, updateDocument } from './actions/actions'
import { Form } from './form/page'

const Documents = () => {
    const [data, setData] = useState<IDocument[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [client, setClient] = useState<IClient>() // MAKE IT AN OBJECT FOR DROPDOWN
    const [vehicle, setVehicle] = useState<IVehicle>() // MAKE IT AN OBJECT FOR DROPDOWN
    const [price, setPrice] = useState<string>('')
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')

    const columns = [{
        header: () => 'Id',
        cell: (cell: any) => cell.renderValue(),
        accessorKey: '_id'
    },
    {
        header: () => 'Nombre',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'name'
    },
    {
        header: () => 'Cliente',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'client.name'
    },
    {
        header: () => 'Vehículo',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'vehicle.name'
    },
    {
        header: () => 'Precio',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'vehicle.price'
    },
    {
        header: () => 'Fecha',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'timestamp'
    },
    {
        id: 'Action',
        header: () => 'Acción',
        cell: (cell: any) => <div className='flex justify-between'>
            <Button onClick={(e) => rowUpdateDrawer(cell.row.index, cell.row.original._id)}>
                <Image src={editIcon} width={25} height={25} alt="rent a car" />
            </Button>
            <Button onClick={(e) => deleteDocument(cell.row.original._id)}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { name, client, vehicle } = data[index]
            setId(id)
            setName(name)
            setClient(client.name)
            setVehicle(vehicle.name)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setName('')
        setPrice('')
        setClient('')
        setVehicle('')
        setOpen(true)
    }

    const loadDocuments = async () => {
        const data = await getDocuments()
        setData(data)
    }

    const registerDocument = (document: IDocument) => {
        addDocument(document)
        loadDocuments()
    }

    const editDocument = (id: string, updatedDocument: IDocument) => {
        updateDocument(id, updatedDocument)
        loadDocuments()
    }

    const deleteDocument = (id: string) => {
        removeDocument(id)
        loadDocuments()
    }

    useEffect(() => {
        loadDocuments()
    }, [])

    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer isOpen={isOpen} setOpen={setOpen} title={action === ActionEnum.ADD ? 'Agregar Cliente' : 'Actualizar Cliente'} >
                <Form
                    setOpen={setOpen}
                    name={name}
                    client={client}
                    vehicle={vehicle}
                    price={price}
                    setName={setName}
                    setClient={setClient}
                    setVehicle={setVehicle}
                    setPrice={setPrice}
                    registerDocument={registerDocument}
                    editDocument={editDocument}
                    action={action}
                    id={id}
                />
            </Drawer>
        </Dashboard >
    )
}

export default Documents