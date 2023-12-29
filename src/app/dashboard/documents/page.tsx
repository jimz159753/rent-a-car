'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { Drawer } from '@/app/components/ui/Drawer'
import { ActionEnum, IClient, IDocument, IVehicle, IDropdownOption } from './interfaces/document.interface'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import { ListTable } from '@/app/components/ui/ListTable'
import { addDocument, getDocuments, removeDocument, updateDocument, getClients, getVehicles } from './actions/actions'
import { Form } from './form/page'



const Documents = () => {
    const [data, setData] = useState<IDocument[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [dropClient, setDropClient] = useState<IDropdownOption | null>(null)
    const [dropVehicle, setDropVehicle] = useState<IDropdownOption | null>(null)
    const [price, setPrice] = useState<string>('')
    const [dropClients, setDropClients] = useState<IDropdownOption[]>()
    const [dropVehicles, setDropVehicles] = useState<IDropdownOption[]>()
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
            const clientOption = { value: client._id, label: client.name }
            const vehicleOption = { value: vehicle._id, label: vehicle.name }
            setId(id)
            setName(name)
            setDropClient(clientOption)
            setDropVehicle(vehicleOption)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setName('')
        setPrice('')
        setDropClient(null)
        setDropVehicle(null)
        setOpen(true)
    }

    const loadDocuments = async () => {
        const documents = await getDocuments()
        setData(documents)
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

    const loadDropdrowns = async () => {
        const clients = await getClients()
        const vehicles = await getVehicles()
        const clientOptions = clients.map((el: IClient) => ({ value: el._id, label: el.name }))
        const vehicleOptions = vehicles.map((el: IVehicle) => ({ value: el._id, label: el.name }))
        setDropClients(clientOptions)
        setDropVehicles(vehicleOptions)
    }

    useEffect(() => {
        loadDocuments()
        loadDropdrowns()
    }, [])

    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer
                isOpen={isOpen}
                setOpen={setOpen}
                title={action === ActionEnum.ADD ?
                    'Agregar Cliente'
                    :
                    'Actualizar Cliente'}
            >
                {dropClients && dropVehicles &&
                    <Form
                        setOpen={setOpen}
                        name={name}
                        dropClient={dropClient}
                        dropVehicle={dropVehicle}
                        price={price}
                        setName={setName}
                        setDropClient={setDropClient}
                        setDropVehicle={setDropVehicles}
                        setPrice={setPrice}
                        registerDocument={registerDocument}
                        editDocument={editDocument}
                        action={action}
                        id={id}
                        dropClients={dropClients}
                        dropVehicles={dropVehicles}
                    />}
            </Drawer>
        </Dashboard >
    )
}

export default Documents