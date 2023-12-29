'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { ListTable } from '@/app/components/ui/ListTable'
import { Button } from '@/app/components/ui/Button'
import { Drawer } from '@/app/components/ui/Drawer'
import { Form } from './form/page'
import Image from 'next/image'
import { ActionEnum, IClient } from './interfaces/client.interface'
import './page.css'
import { addClient, getClients, removeClient, updateClient } from './actions/actions'

const Clients = () => {
    const [data, setData] = useState<IClient[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [dni, setDni] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')

    const columns = [{
        header: () => 'Id',
        cell: (cell: any) => cell.renderValue(),
        accessorKey: '_id'
    },
    {
        header: () => 'Dni',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'dni'
    },
    {
        header: () => 'Nombre',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'name'
    },
    {
        header: () => 'Teléfono',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'phone'
    },
    {
        header: () => 'Dirección',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'address'
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
            <Button onClick={(e) => deleteClient(cell.row.original._id)}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { dni, name, phone, address } = data[index]
            setId(id)
            setDni(dni)
            setName(name)
            setPhone(phone)
            setAddress(address)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setDni('')
        setName('')
        setPhone('')
        setAddress('')
        setOpen(true)
    }

    const registerClient = (client: IClient) => {
        addClient(client)
        loadClients()
    }

    const loadClients = async () => {
        const data = await getClients()
        setData(data)
    }

    const editClient = (id: string, updatedClient: IClient) => {
        updateClient(id, updatedClient)
        loadClients()
    }

    const deleteClient = (id: string) => {
        removeClient(id)
        loadClients()
    }

    useEffect(() => {
        loadClients()
    }, [])

    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer isOpen={isOpen} setOpen={setOpen} title={action === ActionEnum.ADD ? 'Agregar Cliente' : 'Actualizar Cliente'} >
                <Form
                    setOpen={setOpen}
                    dni={dni} name={name}
                    phone={phone}
                    address={address}
                    setDni={setDni}
                    setName={setName}
                    setPhone={setPhone}
                    setAddress={setAddress}
                    registerClient={registerClient}
                    editClient={editClient}
                    action={action}
                    id={id}
                />
            </Drawer>
        </Dashboard >
    )
}

export default Clients