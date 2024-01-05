import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { ActionEnum, IClient, IDropdownOption, IVehicle } from '../interfaces/rent.interface'
import { Dropdown } from '@/app/components/ui/Dropdown'
import './form.css'
import { ActionMeta, SingleValue } from 'react-select'

interface FormProps<T extends object> {
    setOpen: (e: boolean) => void
    days: string
    setDays: (e: string) => void
    dropClient: IDropdownOption
    dropVehicle: IDropdownOption
    payment: string
    setPayment: (e: string) => void
    total: string
    setTotal: (e: string) => void
    description: string
    setDescription: (e: string) => void
    action: ActionEnum
    dropClients: IClient[] | T[];
    dropVehicles: IVehicle[] | T[];
    clientsOnChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    vehiclesOnChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    handleAction: React.MouseEventHandler<HTMLButtonElement>
}

export const Form = <T extends object>({
    setOpen,
    dropClient,
    dropVehicle,
    days,
    setDays,
    payment,
    setPayment,
    total,
    setTotal,
    description,
    setDescription,
    action,
    dropClients,
    dropVehicles,
    clientsOnChange,
    vehiclesOnChange,
    handleAction
}: FormProps<T>) => {
    return (
        <div className='documents-form'>
            <Input label='Dias' name='days' type='text' placeholder='dias' value={days} onChange={(e) => setDays(e.target.value)} required />
            <Input label='Anticipo' name='payment' type='text' placeholder='anticipo' value={payment} onChange={(e) => setPayment(e.target.value)} required />
            <Input label='Total' name='total' type='text' placeholder='total' value={total} onChange={(e) => setTotal(e.target.value)} required />
            <Input label='Descripción' name='description' type='text' placeholder='descripción' value={description} onChange={(e) => setDescription(e.target.value)} required />
            <Dropdown id='client' label='Cliente' options={dropClients as T[]} onChange={clientsOnChange} value={dropClient as T} placeholder='selecciona un cliente' name='clients' />
            <Dropdown id='vehicle' label='Vehículo' options={dropVehicles as T[]} onChange={vehiclesOnChange} value={dropVehicle as T} placeholder='selecciona un vehículo' name='vehicles' />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </div>
    )
}
