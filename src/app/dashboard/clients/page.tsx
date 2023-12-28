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

const Clients = () => {
    const [data, setData] = React.useState<IClient[]>()
    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')
    const [isOpen, setOpen] = React.useState(false)
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const [id, setId] = useState<string>('')
    const [dni, setDni] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')



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
            <Button onClick={(e) => { removeClient(e, cell.row.original._id) }}>
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

    const addClient = async (newClient: IClient) => {
        const token = localStorage.getItem('token')
        await fetch(`${process.env.API_URL}/clients`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClient)
        })
        getClients()
    }

    const getClients = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.API_URL}/clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        setData(data)
    }

    const updateClient = async (id: string, updatedClient: IClient) => {
        const token = localStorage.getItem('token')
        await fetch(`${process.env.API_URL}/clients/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedClient)
        })
        getClients()
    }

    const removeClient = async (e: React.SyntheticEvent<EventTarget>, id: string) => {
        const token = localStorage.getItem('token')
        e.preventDefault()
        await fetch(`${process.env.API_URL}/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        getClients()
    }

    useEffect(() => {
        getClients()
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
                    addClient={addClient}
                    updateClient={updateClient}
                    action={action}
                    id={id}
                />
            </Drawer>
        </Dashboard >
    )
}

export default Clients