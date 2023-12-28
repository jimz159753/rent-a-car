import React from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import './page.css'

interface FormProps {
    setOpen: (e: boolean) => void
}

export const Form = ({ setOpen }: FormProps) => {
    return (
        <form className='form'>
            <Input label='Dni' name='dni' type='text' placeholder='dni' value='' onChange={(e) => { }} required />
            <Input label='Name' name='name' type='text' placeholder='name' value='' onChange={(e) => { }} required />
            <Input label='Phone' name='phone' type='text' placeholder='phone' value='' onChange={(e) => { }} required />
            <Input label='Address' name='address' type='text' placeholder='address' value='' onChange={(e) => { }} required />
            <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
        </form>
    )
}
