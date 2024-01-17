import React from 'react'
import { ActionEnum, FieldType, IClient, IVehicle } from '../interfaces/rent.interface'
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import './form.css'
import { Dayjs } from 'dayjs'

interface FormProps {
    setOpen: (e: boolean) => void
    days: string
    payment: string
    total: string
    startDate: string
    endDate: string
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
    startDate,
    endDate,
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
                startDate,
                endDate,
                description
            }}
            className='rents-form'
            onFinish={(values) => {
                values.startDate = values.startDate.format('DD-MM-YYYY')
                values.endDate = values.endDate.format('DD-MM-YYYY')
                handleAction(values)
            }}>
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
                <InputNumber placeholder='dias' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Anticipo"
                name="payment"
                rules={[{ required: true, message: 'Anticipo requerido.' }]}
            >
                <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    placeholder='payment' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Total"
                name="total"
                rules={[{ required: true, message: 'Total requerido.' }]}
            >
                <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    placeholder='total' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Día de entrada"
                name="startDate"
                rules={[{ required: true, message: 'Día requerido.' }]}
            >
                <DatePicker placeholder='entrada' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Día de salída"
                name="endDate"
                rules={[{ required: true, message: 'Día requerido.' }]}
            >
                <DatePicker placeholder='salída' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Descripción"
                name="description"
                rules={[{ required: true, message: 'Descripción requerido.' }]}
            >
                <Input placeholder='descripción' />
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
