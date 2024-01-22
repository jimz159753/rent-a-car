import { DatePicker, Form, Input } from 'antd'
import React from 'react'
import { FieldType } from '../interface/register.interface';
import './clientForm.css'


interface FormProps {
    handleAction: (values: FieldType) => void
    form: any;
}

export const ClientForm = ({
    form,
    handleAction }: FormProps) => {
    return (
        <Form
            requiredMark={'optional'}
            form={form}
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
                <DatePicker placeholder='fecha de nacimiento' />
            </Form.Item>
            <Form.Item<FieldType>
                label="País"
                name="country"
                rules={[{ required: true, message: 'País requerido.' }]}
            >
                <Input placeholder='país' />
            </Form.Item>
        </Form>
    )
}
