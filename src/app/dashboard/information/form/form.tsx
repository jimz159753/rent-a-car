import React from 'react'
import { Button, Form, Input } from 'antd';
import './form.css'

interface FormProps {
    handleAction: (values: Ifields) => void
    form: any
}

export interface Ifields {
    password: string
    confirmation: string
}

export const UserForm = ({ handleAction, form }: FormProps) => <Form
    requiredMark={'optional'}
    form={form}
    className='user-form'
    onFinish={handleAction}>
    <Form.Item
        label="Nueva contraseña"
        name="password"
        rules={[{ required: true, message: 'Nueva contraseña requerida.' }]}
    >
        <Input.Password placeholder='contraseña' />
    </Form.Item>
    <Form.Item
        label="Confirmar nueva contraseña"
        name="confirmation"
        rules={[{ required: true, message: 'Confirmación requerida.' }]}
    >
        <Input.Password placeholder='confirmación' />
    </Form.Item>
    <Form.Item>
        <Button className='submit' htmlType='submit' >Enviar</Button>
    </Form.Item>
</Form>