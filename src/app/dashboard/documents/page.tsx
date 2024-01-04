'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { Drawer } from '@/app/components/ui/Drawer'
import { ActionEnum, IClient, IDocument, IDropdownOption, IVehicle } from './interfaces/document.interface'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import { ListTable } from '@/app/components/ui/ListTable'
import { addDocument, getDocuments, removeDocument, updateDocument, getClients, getVehicles } from './actions/actions'
import { Form } from './form/page'
import { ActionMeta } from 'react-select'

const Documents = <T extends object>() => {
    const [data, setData] = useState<IDocument[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [dropClient, setDropClient] = useState<null | any>(null)
    const [dropVehicle, setDropVehicle] = useState<null | any>(null)
    const [price, setPrice] = useState<string>('')
    const [dropClients, setDropClients] = useState<IClient[] | T[]>([])
    const [dropVehicles, setDropVehicles] = useState<IVehicle[] | T[]>([])
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
        accessorKey: 'vehicle.brand'
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
            const clientOption = { value: client, label: client.name }
            const vehicleOption = { value: vehicle, label: vehicle.model }
            setId(id)
            setName(name)
            setDropClient(clientOption)
            setDropVehicle(vehicleOption)
            setPrice(vehicle.price)
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

    const registerDocument = async (document: IDocument) => {
        await addDocument(document)
        await loadDocuments()
    }

    const editDocument = async (id: string, updatedDocument: IDocument) => {
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
        const clientOptions = clients.map((el: IClient) => ({ value: el, label: el.name }))
        const vehicleOptions = vehicles.map((el: IVehicle) => ({ value: el, label: el.brand }))
        setDropClients(clientOptions)
        setDropVehicles(vehicleOptions)
    }

    useEffect(() => {
        loadDocuments()
        loadDropdrowns()
    }, [])

    const clientsOnChange = (newValue: any, actionMeta: ActionMeta<T>) => {
        setDropClient(newValue)
    }

    const vehiclesOnChange = (newValue: any, actionMeta: ActionMeta<T>) => {
        setDropVehicle(newValue)
    }

    const handleAction = () => {
        const document = {
            name,
            client: dropClient.value,
            vehicle: dropVehicle.value,
            price
        }

        if (action === ActionEnum.ADD) {
            setName('')
            setDropClient(null)
            setDropVehicle(null)
            setPrice('')
            setOpen(false)
            registerDocument(document)
        } else {
            editDocument(id, document)
        }
    }

    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer
                isOpen={isOpen}
                setOpen={setOpen}
                title={action === ActionEnum.ADD ?
                    'Agregar Documento'
                    :
                    'Actualizar Documento'}
            >
                {dropClients && dropVehicles &&
                    <Form
                        handleAction={handleAction}
                        clientsOnChange={clientsOnChange}
                        vehiclesOnChange={vehiclesOnChange}
                        setOpen={setOpen}
                        name={name}
                        dropClient={dropClient as IDropdownOption}
                        dropVehicle={dropVehicle as IDropdownOption}
                        price={price}
                        setName={setName}
                        setPrice={setPrice}
                        action={action}
                        dropClients={dropClients}
                        dropVehicles={dropVehicles}
                    />}
            </Drawer>
        </Dashboard >
    )
}

export default Documents