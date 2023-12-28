'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { ListTable } from '@/app/components/ui/ListTable'
import { Button } from '@/app/components/ui/Button'
import { Drawer } from '@/app/components/ui/Drawer'
import { Form } from './form/page'
import Image from 'next/image'
import { IClient } from './interfaces/client.interface'
import './page.css'

const Clients = () => {
    const [data, setData] = React.useState<IClient[]>()
    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')
    const [isOpen, setOpen] = React.useState(false)

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
            <Button onClick={() => setOpen(true)}>
                <Image src={editIcon} width={25} height={25} alt="rent a car" />
            </Button>
            <Button onClick={(e) => { removeClient(e, cell.row.original._id) }}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

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

    const removeClient = async (e: React.SyntheticEvent<EventTarget>, id: string) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        await fetch(`${process.env.API_URL}/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        getClients()
    }

    const updateClient = async (id: string, updatedClient: IClient) => {
        const token = localStorage.getItem('token')
        await fetch(`${process.env.API_URL}/clients/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedClient)
        })
        getClients()
    }

    useEffect(() => {
        getClients()
    }, [])
    // Make Form component general for creating and updating data
    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} />}
            <Drawer isOpen={isOpen} setOpen={setOpen} title='Actualizar cliente' >
                <Form setOpen={setOpen} />
            </Drawer>
        </Dashboard >
    )
}

export default Clients