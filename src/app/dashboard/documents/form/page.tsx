import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import './page.css'
import { ActionEnum, IClient, IDocument, IVehicle } from '../interfaces/document.interface'

interface FormProps {
    id: string
    setOpen: (e: boolean) => void
    name: string
    setName: (e: string) => void
    client: IClient
    setClient: (e: IClient) => void
    vehicle: IVehicle
    setVehicle: (e: IVehicle) => void
    price: string
    setPrice: (e: string) => void
    action: ActionEnum
    registerDocument: (document: IDocument) => void
    editDocument: (id: string, document: IDocument) => void
}

export const Form = ({
    id,
    setOpen,
    name,
    client,
    vehicle,
    price,
    setName,
    setClient,
    setVehicle,
    setPrice,
    action,
    registerDocument,
    editDocument }: FormProps) => {

    const handleAction = () => {

    }
    // CREATE DOPDOWN FOR CLIENT AND VEHICLES
    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <Input label='Nombre' name='name' type='text' placeholder='nombre' value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label='Cliente' name='address' type='text' placeholder='cliente' value={''} onChange={(e) => { }} required />
            <Input label='Vehículo' name='vehicle' type='text' placeholder='vehículo' value={''} onChange={(e) => { }} required />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </form>
    )
}
