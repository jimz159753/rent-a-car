'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { Drawer } from '@/app/components/ui/Drawer'
import { ListTable } from '@/app/components/ui/ListTable'
import { ActionEnum, IVehicle, StatusEnum } from './interfaces/vehicle.interface'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import './page.css'
import { Form } from './form/form'
import { addVehicle, getVehicles, removeVehicle, updateVehicle } from './actions/actions'
import { ActionMeta } from 'react-select'

const Vehicles = <T extends object>() => {
    const [data, setData] = useState<IVehicle[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [plate, setPlate] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [dropStatus, setDropStatus] = useState<null | any>(null)
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const StatusOptions: any[] = [
        { value: StatusEnum.AVAILABLE, label: 'Disponible' },
        { value: StatusEnum.RENTED, label: 'Alquilado' }
    ]

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
            const statusOption = { value: status, label: status }
            setId(id)
            setModel(model)
            setBrand(brand)
            setPlate(plate)
            setPrice(price)
            setDropStatus(statusOption)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setModel('')
        setBrand('')
        setPlate('')
        setPrice('')
        setDropStatus(null)
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

    const StatusOnChange = (newValue: any, actionMeta: ActionMeta<T>) => {
        setDropStatus(newValue)
    }

    const handleAction = () => {
        const vehicle = {
            model,
            brand,
            plate,
            price,
            status: dropStatus.value
        }
        if (action === ActionEnum.ADD) {
            registerVehicle(vehicle)
            setModel('')
            setBrand('')
            setPlate('')
            setPrice('')
            setDropStatus(null)
        } else {
            editVehicle(id, vehicle)
        }
    }


    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer isOpen={isOpen} setOpen={setOpen} title={action === ActionEnum.ADD ? 'Agregar Vehículo' : 'Actualizar Vehículo'} >
                <Form
                    setOpen={setOpen}
                    model={model}
                    brand={brand}
                    plate={plate}
                    price={price}
                    dropStatus={dropStatus}
                    setModel={setModel}
                    setBrand={setBrand}
                    setPlate={setPlate}
                    setPrice={setPrice}
                    action={action}
                    StatusOnChange={StatusOnChange}
                    handleAction={handleAction}
                    StatusOptions={StatusOptions}
                />
            </Drawer>
        </Dashboard>
    )
}

export default Vehicles