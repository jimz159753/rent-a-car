'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { Drawer } from '@/app/components/ui/Drawer'
import { ListTable } from '@/app/components/ui/ListTable'
import { ActionEnum, IClient, IDropdownOption, IRent, IVehicle } from './interfaces/rent.interface'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import { Form } from './form/page'
import { addRent, getClients, getRents, getVehicles, removeRent, updateRent } from './actions/actions'
import { ActionMeta } from 'react-select'

const Rent = <T extends object>() => {
    const [data, setData] = useState<IRent[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [dropClient, setDropClient] = useState<null | any>(null)
    const [dropVehicle, setDropVehicle] = useState<null | any>(null)
    const [days, setDays] = useState<string>('')
    const [payment, setPayment] = useState<string>('')
    const [total, setTotal] = useState<string>('')
    const [description, setDescription] = useState<string>('')
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
        header: () => 'Dias',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'days'
    },
    {
        header: () => 'Anticipo',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'payment'
    },
    {
        header: () => 'Total',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'total'
    },
    {
        header: () => 'Descripción',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'description'
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
            <Button onClick={(e) => deleteRent(cell.row.original._id)}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { client, vehicle, days, payment, total, description } = data[index]
            const clientOption = { value: client, label: client.name }
            const vehicleOption = { value: vehicle, label: vehicle.model }
            setId(id)
            setDropClient(clientOption)
            setDropVehicle(vehicleOption)
            setDays(days)
            setPayment(payment)
            setTotal(total)
            setDescription(description)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setDropClient(null)
        setDropVehicle(null)
        setDays('')
        setPayment('')
        setTotal('')
        setDescription('')
        setOpen(true)
    }

    const loadRents = async () => {
        const rents = await getRents()
        setData(rents)
    }

    const registerRent = async (document: IRent) => {
        await addRent(document)
        await loadRents()
    }

    const editRent = async (id: string, updatedRent: IRent) => {
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
        const clientOptions = clients.map((el: IClient) => ({ value: el, label: el.name }))
        const vehicleOptions = vehicles.map((el: IVehicle) => ({ value: el, label: el.brand }))
        setDropClients(clientOptions)
        setDropVehicles(vehicleOptions)
    }

    useEffect(() => {
        loadRents()
        loadDropdrowns()
    }, [])

    const clientsOnChange = (newValue: any, actionMeta: ActionMeta<T>) => {
        setDropClient(newValue)
    }

    const vehiclesOnChange = (newValue: any, actionMeta: ActionMeta<T>) => {
        setDropVehicle(newValue)
    }

    const handleAction = () => {
        const rent = {
            client: dropClient.value,
            vehicle: dropVehicle.value,
            days,
            payment,
            total,
            description
        }

        if (action === ActionEnum.ADD) {
            setDropClient(null)
            setDropVehicle(null)
            setDays('')
            setPayment('')
            setTotal('')
            setDescription('')
            setOpen(false)
            registerRent(rent)
        } else {
            editRent(id, rent)
        }
    }

    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer
                isOpen={isOpen}
                setOpen={setOpen}
                title={action === ActionEnum.ADD ?
                    'Agregar Alquiler'
                    :
                    'Actualizar Alquiler'}
            >
                {dropClients && dropVehicles &&
                    <Form
                        handleAction={handleAction}
                        clientsOnChange={clientsOnChange}
                        vehiclesOnChange={vehiclesOnChange}
                        setOpen={setOpen}
                        dropClient={dropClient as IDropdownOption}
                        dropVehicle={dropVehicle as IDropdownOption}
                        days={days}
                        payment={payment}
                        total={total}
                        description={description}
                        setDays={setDays}
                        setPayment={setPayment}
                        setTotal={setTotal}
                        setDescription={setDescription}
                        action={action}
                        dropClients={dropClients}
                        dropVehicles={dropVehicles}
                    />}
            </Drawer>
        </Dashboard >
    )
}

export default Rent