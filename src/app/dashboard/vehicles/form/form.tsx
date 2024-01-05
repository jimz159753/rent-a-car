import React from 'react'
import './form.css'
import { ActionEnum, IDropdownOption, IVehicle, StatusEnum } from '../interfaces/vehicle.interface'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { ActionMeta, SingleValue } from 'react-select'
import { Dropdown } from '@/app/components/ui/Dropdown'

interface FormProps<T extends object> {
    setOpen: (e: boolean) => void
    model: string
    setModel: (e: string) => void
    brand: string
    setBrand: (e: string) => void
    plate: string
    setPlate: (e: string) => void
    price: string
    setPrice: (e: string) => void
    dropStatus: IDropdownOption
    action: ActionEnum
    StatusOnChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    handleAction: React.MouseEventHandler<HTMLButtonElement>
    StatusOptions: T[]
}

export const Form = <T extends object>({
    setOpen,
    model,
    brand,
    plate,
    price,
    dropStatus,
    setModel,
    setBrand,
    setPlate,
    setPrice,
    action,
    StatusOnChange,
    handleAction,
    StatusOptions }: FormProps<T>) => {


    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <Input label='Modelo' name='model' type='text' placeholder='modelo' value={model} onChange={(e) => setModel(e.target.value)} required />
            <Input label='Marca' name='brand' type='text' placeholder='marca' value={brand} onChange={(e) => setBrand(e.target.value)} required />
            <Input label='Placa' name='plate' type='text' placeholder='placa' value={plate} onChange={(e) => setPlate(e.target.value)} required />
            <Input label='Precio' name='price' type='number' placeholder='precio' value={price} onChange={(e) => setPrice(e.target.value)} required />
            <Dropdown id='client' label='Cliente' options={StatusOptions} onChange={StatusOnChange} value={dropStatus as T} placeholder='selecciona un estatus' name='status' />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </form>
    )
}
