import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { ActionEnum, IDocument } from '../interfaces/document.interface'
import { Dropdown } from '@/app/components/ui/Dropdown'
import './page.css'
import { ActionMeta, SingleValue } from 'react-select'

interface FormProps<T extends object> {
    id: string
    setOpen: (e: boolean) => void
    name: string
    setName: (e: string) => void
    dropClient?: T | null
    setDropClient: Function
    dropVehicle?: T | null
    setDropVehicle: Function
    price: string
    setPrice: (e: string) => void
    action: ActionEnum
    registerDocument: (document: IDocument) => void
    editDocument: (id: string, document: IDocument) => void
    dropClients: T[];
    dropVehicles: T[];
}

export const Form = <T extends object>({
    id,
    setOpen,
    name,
    dropClient,
    dropVehicle,
    price,
    setName,
    setDropClient,
    setDropVehicle,
    setPrice,
    action,
    registerDocument,
    editDocument,
    dropClients,
    dropVehicles
}: FormProps<T>) => {

    const handleAction = () => {

    }

    const clientsOnChange = (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => {
        setDropClient(newValue)
    }

    const vehiclesOnChange = (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => {
        setDropVehicle(newValue)
    }


    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <Input label='Nombre' name='name' type='text' placeholder='nombre' value={name} onChange={(e) => setName(e.target.value)} required />
            <Dropdown label='Cliente' options={dropClients} onChange={clientsOnChange} value={dropClient} placeholder='selecciona un cliente' name='clients' />
            <Dropdown label='Vehículo' options={dropVehicles} onChange={vehiclesOnChange} value={dropVehicle} placeholder='selecciona un vehículo' name='vehicles' />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </form>
    )
}
