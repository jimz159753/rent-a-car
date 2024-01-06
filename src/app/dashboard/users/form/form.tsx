import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { ActionEnum, IDropdownOption, RoleEnum } from '../interfaces/user.interface'
import './form.css'
import { Dropdown } from '@/app/components/ui/Dropdown'
import { ActionMeta, SingleValue } from 'react-select'

interface FormProps<T extends object> {
    setOpen: (e: boolean) => void
    email: string
    setEmail: (e: string) => void
    name: string
    setName: (e: string) => void
    phone: string
    setPhone: (e: string) => void
    address: string
    setAddress: (e: string) => void
    password: string
    setPassword: (e: string) => void
    action: ActionEnum
    handleAction: React.MouseEventHandler<HTMLButtonElement>
    dropRole: IDropdownOption
    RoleOnChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
}

export const Form = <T extends object>({
    setOpen,
    name,
    email,
    phone,
    address,
    dropRole,
    password,
    setEmail,
    setName,
    setPhone,
    setAddress,
    setPassword,
    action,
    handleAction,
    RoleOnChange
}: FormProps<T>) => {
    const dropRoles = [
        {
            value: RoleEnum.ADMIN,
            label: RoleEnum.ADMIN
        },
        {
            value: RoleEnum.EMPLOYEE,
            label: RoleEnum.EMPLOYEE
        }
    ]

    return (
        <form className='users-form' onSubmit={(e) => e.preventDefault()}>
            <Input label='Nombre' name='name' type='text' placeholder='nombre' value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label='Correo eléctronico' name='email' type='text' placeholder='correo' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label='Teléfono' name='phone' type='number' placeholder='teléfono' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input label='Dirección' name='address' type='text' placeholder='dirección' value={address} onChange={(e) => setAddress(e.target.value)} required />
            <Dropdown id='role' label='Role' options={dropRoles as T[]} onChange={RoleOnChange} value={dropRole as T} placeholder='selecciona un role' name='role' />
            {action === ActionEnum.ADD &&
                <Input
                    label='Contraseña'
                    name='password'
                    type='text'
                    placeholder='contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />}
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </form>
    )
}
