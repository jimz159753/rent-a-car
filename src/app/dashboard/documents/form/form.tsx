import React from 'react'
import { ActionEnum, FieldType, IClient, IVehicle } from '../interfaces/document.interface'
import './form.css'
import { Button, Form, Input, Select } from 'antd'

interface FormProps {
    setOpen: (e: boolean) => void
    name: string
    client: string
    vehicle: string
    action: ActionEnum
    dropClients: IClient[];
    dropVehicles: IVehicle[];
    handleAction: (values: FieldType) => void
    form: any
}

export const DocumentForm = ({
    setOpen,
    name,
    client,
    vehicle,
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
                name,
                client,
                vehicle
            }}
            className='documents-form'
            onFinish={handleAction}>
            <Form.Item<FieldType>
                label="Nombre"
                name="name"
                rules={[{ required: true, message: 'Nombre requerido.' }]}
            >
                <Input placeholder='nombre' />
            </Form.Item>
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
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Form.Item>
                    <Button className='submit' htmlType='submit' >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
                </Form.Item>
            </div>
        </Form>
    )
}
