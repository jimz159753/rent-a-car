import React from 'react'
import './form.css'
import { ActionEnum, FieldType, StatusEnum } from '../interfaces/vehicle.interface'
import { Button, Form, Input, Select } from 'antd'

interface FormProps<T extends object> {
    setOpen: (e: boolean) => void
    model: string
    brand: string
    plate: string
    price: string
    status: StatusEnum
    action: ActionEnum
    handleAction: (values: FieldType) => void
    form: any;
}

export const VehicleForm = <T extends object>({
    setOpen,
    model,
    brand,
    plate,
    price,
    status,
    action,
    handleAction,
    form }: FormProps<T>) => {
    const dropStatus = [
        {
            lable: StatusEnum.AVAILABLE,
            value: StatusEnum.AVAILABLE
        },
        {
            lable: StatusEnum.RENTED,
            value: StatusEnum.RENTED
        }
    ]

    return (
        <Form
            form={form}
            initialValues={{
                model,
                brand,
                plate,
                price,
                status
            }}
            className='form'
            onFinish={handleAction}>
            <Form.Item<FieldType>
                label="Modelo"
                name="model"
                rules={[{ required: true, message: 'Modelo requerido.' }]}
            >
                <Input placeholder='dni' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Marca"
                name="brand"
                rules={[{ required: true, message: 'Marca requerido.' }]}
            >
                <Input placeholder='marca' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Placa"
                name="plate"
                rules={[{ required: true, message: 'Placa requerido.' }]}
            >
                <Input placeholder='plate' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Precio"
                name="price"
                rules={[{ required: true, message: 'Precio requerido.' }]}
            >
                <Input placeholder='price' />
            </Form.Item>
            <Form.Item<FieldType>
                label="Estatus"
                name="status"
                rules={[{ required: true, message: 'Estatus requerido.' }]}
            >
                <Select placeholder='selecciona un estatus' options={dropStatus} />
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
