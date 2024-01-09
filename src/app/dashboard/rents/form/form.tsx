import React from 'react'
import { ActionEnum, FieldType, IClient, IVehicle } from '../interfaces/rent.interface'
import { Button, Form, Input, Select } from 'antd'
import './form.css'

interface FormProps {
    setOpen: (e: boolean) => void
    days: string
    payment: string
    total: string
    description: string
    action: ActionEnum
    dropClients: IClient[];
    dropVehicles: IVehicle[];
    handleAction: (values: FieldType) => void
    form: any
    client: string
    vehicle: string
}

export const RentForm = ({
    setOpen,
    client,
    vehicle,
    days,
    payment,
    total,
    description,
    action,
    dropClients,
    dropVehicles,
    handleAction,
    form
}: FormProps) => {
    return (
        <Form
            requiredMark={'optional'}
            form={form}
            initialValues={{
                client,
                vehicle,
                days,
                payment,
                total,
                description
            }}
            className='rents-form'
            onFinish={handleAction}>
            <Form.Item<FieldType>
                label="Cliente"
                name="client"
                rules={[{ required: true, message: 'Cliente requerido.' }]}
            >
                <Select placeholder='selecciona un cliente' options={dropClients} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Vehículo"
                name="vehicle"
                rules={[{ required: true, message: 'Vehículo requerido.' }]}
            >
                <Select placeholder='selecciona un vehículo' options={dropVehicles} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Dias"
                name="days"
                rules={[{ required: true, message: 'Dias requerido.' }]}
            >
                <Input placeholder='dias' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Anticipo"
                name="payment"
                rules={[{ required: true, message: 'Anticipo requerido.' }]}
            >
                <Input placeholder='payment' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Total"
                name="total"
                rules={[{ required: true, message: 'Total requerido.' }]}
            >
                <Input placeholder='total' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Descripción"
                name="description"
                rules={[{ required: true, message: 'Descripción requerido.' }]}
            >
                <Input placeholder='descripción' />
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
