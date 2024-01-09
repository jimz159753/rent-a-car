import React from 'react'
import { ActionEnum, FieldType } from '../interfaces/client.interface'
import { Button, Input, Form } from 'antd'
import './form.css'

interface FormProps {
    setOpen: (value: boolean) => void
    action: ActionEnum
    handleAction: (values: FieldType) => void
    form: any;
    dni: string;
    name: string;
    phone: string;
    address: string;
}

export const ClientForm = ({
    setOpen,
    action,
    handleAction,
    dni,
    name,
    phone,
    address,
    form }: FormProps) => {

    return (
        <Form
            requiredMark={'optional'}
            form={form}
            initialValues={{
                dni,
                name,
                phone,
                address
            }}
            className='clients-form'
            onFinish={handleAction}>
            <Form.Item<FieldType>
                label="Dni"
                name="dni"
                rules={[{ required: true, message: 'Dni requerido.' }]}
            >
                <Input placeholder='dni' />
            </Form.Item>
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
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Form.Item>
                    <Button className='submit' htmlType='submit' >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
                </Form.Item>
            </div>
        </Form>
    )
}
