'use client'
import React from 'react'
import Dashboard from '../page'
import {
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ListTable } from '@/app/components/ui/ListTable'

type Client = {
    id: string
    dni: string
    name: string
    phone: string
    address: string
    date: number
}

const defaultData: Client[] = [
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
    {
        id: '1234',
        dni: 'INE',
        name: 'Luis Jimenez',
        phone: '3315027257',
        address: 'Trafalgar #2581',
        date: Date.now()
    },
]

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
    cell: (row: any) => <p>{row.renderValue()}</p>,
    accessorKey: 'date'
},
]

const Clients = () => {
    const [data, setData] = React.useState(() => [...defaultData])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <Dashboard>
            <ListTable data={defaultData} columns={columns} />
        </Dashboard >
    )
}

export default Clients