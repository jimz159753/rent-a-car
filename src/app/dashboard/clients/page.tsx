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
    const [date, setDate] = React.useState('')

    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')

    const columns = [{
        header: () => 'Id',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'id'
    },
    {
        header: () => 'Dni',
        cell: (row: any) => <p>{row.renderValue()}</p>,
        accessorKey: 'dni'
    },
    {
        header: () => 'Nombre',
        cell: (row: any) => <p>{row.renderValue()}</p>,
        accessorKey: 'name'
    },
    {
        header: () => 'Telefono',
        cell: (row: any) => <p>{row.renderValue()}</p>,
        accessorKey: 'phone'
    },
    {
        header: () => 'Direccion',
        cell: (row: any) => <p>{row.renderValue()}</p>,
        accessorKey: 'address'
    },
    {
        header: () => 'Fecha',
        cell: (row: any) => <p>{date}</p>,
        accessorKey: 'date'
    },
    {
        id: 'Action',
        header: () => 'Accion',
        cell: (row: any) => <div className='flex justify-between'>
            <Button onClick={() => { console.log('edit') }}>
                <Image src={editIcon} width={25} height={25} alt="rent a car" />
            </Button>
            <Button onClick={() => { console.log('delete') }}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    useEffect(() => {
        setDate(Date())
    }, [])

    return (
        <Dashboard>
            <ListTable data={data} columns={columns} />
        </Dashboard >
    )
}

export default Clients