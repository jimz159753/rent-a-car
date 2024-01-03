import React from 'react'
import './page.css'
import { ActionEnum, IVehicle } from '../interfaces/vehicle.interface'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'

interface FormProps {
    id: string
    setOpen: (e: boolean) => void
    model: string
    setModel: (e: string) => void
    brand: string
    setBrand: (e: string) => void
    plate: string
    setPlate: (e: string) => void
    price: string
    setPrice: (e: string) => void
    status: string
    setStatus: (e: string) => void
    action: ActionEnum
    registerVehicle: (vehicle: IVehicle) => void
    editVehicle: (id: string, vehicle: IVehicle) => void
}

export const Form = ({
    id,
    setOpen,
    model,
    brand,
    plate,
    price,
    status,
    setModel,
    setBrand,
    setPlate,
    setPrice,
    setStatus,
    action,
    registerVehicle,
    editVehicle }: FormProps) => {

    const handleAction = () => {
        const vehicle = {
            model,
            brand,
            plate,
            price,
            status
        }
        if (action === ActionEnum.ADD) {
            registerVehicle(vehicle)
            setModel('')
            setBrand('')
            setPlate('')
            setPrice('')
            setStatus('')
        } else {
            editVehicle(id, vehicle)
        }
    }

    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <Input label='Modelo' name='model' type='text' placeholder='modelo' value={model} onChange={(e) => setModel(e.target.value)} required />
            <Input label='Marca' name='brand' type='text' placeholder='marca' value={brand} onChange={(e) => setBrand(e.target.value)} required />
            <Input label='Placa' name='plate' type='text' placeholder='placa' value={plate} onChange={(e) => setPlate(e.target.value)} required />
            <Input label='Precio' name='price' type='text' placeholder='precio' value={price} onChange={(e) => setPrice(e.target.value)} required />
            <Input label='Estatus' name='status' type='text' placeholder='estatus' value={status} onChange={(e) => setStatus(e.target.value)} required />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </form>
    )
}
