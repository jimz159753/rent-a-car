'use client'
import React, { useEffect } from 'react'
import Dashboard from '../page'
import { ListTable } from '@/app/components/ui/ListTable'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import './page.css'

type Client = {
    id: string
    dni: string
    name: string
    phone: string
    address: string
    date: string
}

const defaultData: Client[] = [
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: ''
    },
    {
        id: '123',
        dni: 'INE',
        name: 'Marco Jimenez',
        phone: '3315027257',
        address: 'Hector Berlioz',
        date: ''
    },
    {
        id: '12',
        dni: 'INE',
        name: 'Charly asdf',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: ''
    },
    {
        id: '1',
        dni: 'INE',
        name: 'Uriel Lazaro',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: ''
    },
]



const Clients = () => {
    const [data, setData] = React.useState(() => [...defaultData])
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
            <Button onClick={() => { console.log('edit') }}>
                <Image src={editIcon} width={25} height={25} alt="rent a car" />
            </Button>
            <Button onClick={() => { removeClient(cell.row.original._id) }}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    const getClients = async () => {
        // Create authorization login and save token in local storage
        const response = await fetch(`${process.env.API_URL}/clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODYwYjE3M2UzNDkzMzUyMTQ5YjAxYiIsIm5hbWUiOiJsdWlzIGppbWVuZXoiLCJpYXQiOjE3MDM2MzU3NjYsImV4cCI6MTcwMzcyMjE2Nn0.VwkLxTNmi6pcOuqjGZ91I0g7CDF7ct4wuxLOv18QFUc'
            }
        })
        const data = await response.json()
        setData(data)
    }

    const removeClient = async (id: string) => {
        // Create authorization login and save token in local storage
        const response = await fetch(`${process.env.API_URL}/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODYwYjE3M2UzNDkzMzUyMTQ5YjAxYiIsIm5hbWUiOiJsdWlzIGppbWVuZXoiLCJpYXQiOjE3MDM2MzU3NjYsImV4cCI6MTcwMzcyMjE2Nn0.VwkLxTNmi6pcOuqjGZ91I0g7CDF7ct4wuxLOv18QFUc'
            }
        })
        const data = await response.json()
        console.log('res', data)
    }

    //Create Form for edit method

    useEffect(() => {
        getClients()
    }, [])

    return (
        <Dashboard>
            <ListTable data={data} columns={columns} />
        </Dashboard >
    )
}

export default Clients