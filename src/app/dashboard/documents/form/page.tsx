import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { ActionEnum, IClient, IDropdownOption, IVehicle } from '../interfaces/document.interface'
import { Dropdown } from '@/app/components/ui/Dropdown'
import './page.css'
import { ActionMeta, SingleValue } from 'react-select'

interface FormProps<T extends object> {
    setOpen: (e: boolean) => void
    name: string
    setName: (e: string) => void
    dropClient: IDropdownOption
    dropVehicle: IDropdownOption
    price: string
    setPrice: (e: string) => void
    action: ActionEnum
    dropClients: IClient[] | T[];
    dropVehicles: IVehicle[] | T[];
    clientsOnChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    vehiclesOnChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    handleAction: React.MouseEventHandler<HTMLButtonElement>
}

export const Form = <T extends object>({
    setOpen,
    name,
    dropClient,
    dropVehicle,
    price,
    setName,
    setPrice,
    action,
    dropClients,
    dropVehicles,
    clientsOnChange,
    vehiclesOnChange,
    handleAction
}: FormProps<T>) => {
    return (
        <div className='documents-form'>
            <Input label='Nombre' name='name' type='text' placeholder='nombre' value={name} onChange={(e) => setName(e.target.value)} required />
            <Dropdown id='client' label='Cliente' options={dropClients as T[]} onChange={clientsOnChange} value={dropClient as T} placeholder='selecciona un cliente' name='clients' />
            <Dropdown id='vehicle' label='Vehículo' options={dropVehicles as T[]} onChange={vehiclesOnChange} value={dropVehicle as T} placeholder='selecciona un vehículo' name='vehicles' />
            <Input label='Precio' name='price' type='number' placeholder='precio' value={price} onChange={(e) => setPrice(e.target.value)} required />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </div>
    )
}
