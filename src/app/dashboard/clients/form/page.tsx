import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import './page.css'
import { ActionEnum, IClient } from '../interfaces/client.interface'

interface FormProps {
    id: string
    setOpen: (e: boolean) => void
    dni: string
    setDni: (e: string) => void
    name: string
    setName: (e: string) => void
    phone: string
    setPhone: (e: string) => void
    address: string
    setAddress: (e: string) => void
    action: ActionEnum
    registerClient: (client: IClient) => void
    editClient: (id: string, client: IClient) => void
}

export const Form = ({
    id,
    setOpen,
    dni,
    name,
    phone,
    address,
    setDni,
    setName,
    setPhone,
    setAddress,
    action,
    registerClient,
    editClient }: FormProps) => {

    const handleAction = () => {
        const client = {
            dni,
            name,
            phone,
            address
        }
        if (action === ActionEnum.ADD) {
            registerClient(client)
            setDni('')
            setName('')
            setPhone('')
            setAddress('')
        } else {
            editClient(id, client)
        }
    }

    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <Input label='Dni' name='dni' type='text' placeholder='dni' value={dni} onChange={(e) => setDni(e.target.value)} required />
            <Input label='Nombre' name='name' type='text' placeholder='nombre' value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label='Teléfono' name='phone' type='text' placeholder='teléfono' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input label='Dirección' name='address' type='text' placeholder='dirección' value={address} onChange={(e) => setAddress(e.target.value)} required />
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Button className='update' onClick={handleAction} >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
            </div>
        </form>
    )
}
