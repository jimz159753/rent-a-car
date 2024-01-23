import React from 'react'
import { ActionEnum, FieldType } from '../interfaces/client.interface'
import { Button, Input, Form, DatePicker } from 'antd'
import './form.css'

interface FormProps {
    setOpen: (value: boolean) => void
    action: ActionEnum
    handleAction: (values: FieldType) => void
    form: any;
    name: string;
    phone: string;
    address: string;
    email: string;
    birthday: string;
    country: string;
}

export const ClientForm = ({
    setOpen,
    action,
    handleAction,
    name,
    phone,
    address,
    email,
    birthday,
    country,
    form }: FormProps) => {

    return (
        <Form
            requiredMark={'optional'}
            form={form}
            initialValues={{
                name,
                phone,
                address,
                email,
                birthday,
                country
            }}
            className='clients-form'
            onFinish={handleAction}>
            <Form.Item<FieldType>
                label="Nombre"
                name="name"
                rules={[{ required: true, message: 'Nombre requerido.' }]}
            >
                <Input placeholder='nombre' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Teléfono"
                name="phone"
                rules={[{ required: true, message: 'Teléfono requerido.' }]}
            >
                <Input placeholder='teléfono' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Dirección"
                name="address"
                rules={[{ required: true, message: 'Dirección requerido.' }]}
            >
                <Input placeholder='dirección' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Correo Eléctronico"
                name="email"
                rules={[{ required: true, message: 'Correo eléctronico requerido.' }]}
            >
                <Input placeholder='correo eléctronico' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Fecha de nacimiento"
                name="birthday"
                rules={[{ required: true, message: 'Fecha de nacimiento requerido.' }]}
            >
                <DatePicker placeholder='entrada' />
            </Form.Item>
            <Form.Item<FieldType>
                label="País"
                name="country"
                rules={[{ required: true, message: 'País requerido.' }]}
            >
                <Input placeholder='país' />
            </Form.Item>
            <div className='mt-10 flex justify-between'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Form.Item>
                    <Button className='submit' htmlType='submit' >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
                </Form.Item>
            </div>
        </Form>
    )
}
