'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { Drawer } from '@/app/components/ui/Drawer'
import { ListTable } from '@/app/components/ui/ListTable'
import { ActionEnum, IVehicle } from './interfaces/vehicle.interface'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import './page.css'
import { Form } from './form/page'
import { addVehicle, getVehicles, removeVehicle, updateVehicle } from './actions/actions'

const Vehicles = () => {
    const [data, setData] = useState<IVehicle[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [plate, setPlate] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)

    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')

    const columns = [{
        header: () => 'Id',
        cell: (cell: any) => cell.renderValue(),
        accessorKey: '_id'
    },
    {
        header: () => 'Modelo',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'model'
    },
    {
        header: () => 'Marca',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'brand'
    },
    {
        header: () => 'Placa',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'plate'
    },
    {
        header: () => 'Precio',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'price'
    },
    {
        header: () => 'Estatus',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'status'
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
            <Button onClick={(e) => deleteVehicle(cell.row.original._id)}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { model, brand, plate, price, status } = data[index]
            setId(id)
            setModel(model)
            setBrand(brand)
            setPlate(plate)
            setPrice(price)
            setStatus(status)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setModel('')
        setBrand('')
        setPlate('')
        setPrice('')
        setStatus('')
        setOpen(true)
    }

    const registerVehicle = async (vehicle: IVehicle) => {
        await addVehicle(vehicle)
        await loadVehicles()
    }

    const loadVehicles = async () => {
        const data = await getVehicles()
        setData(data)
    }

    const editVehicle = async (id: string, updatedVehicle: IVehicle) => {
        await updateVehicle(id, updatedVehicle)
        await loadVehicles()
    }

    const deleteVehicle = async (id: string) => {
        await removeVehicle(id)
        await loadVehicles()
    }

    useEffect(() => {
        loadVehicles()
    }, [])


    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer isOpen={isOpen} setOpen={setOpen} title={action === ActionEnum.ADD ? 'Agregar Cliente' : 'Actualizar Cliente'} >
                <Form
                    setOpen={setOpen}
                    model={model}
                    brand={brand}
                    plate={plate}
                    price={price}
                    status={status}
                    setModel={setModel}
                    setBrand={setBrand}
                    setPlate={setPlate}
                    setPrice={setPrice}
                    setStatus={setStatus}
                    registerVehicle={registerVehicle}
                    editVehicle={editVehicle}
                    action={action}
                    id={id}
                />
            </Drawer>
        </Dashboard>
    )
}

export default Vehicles