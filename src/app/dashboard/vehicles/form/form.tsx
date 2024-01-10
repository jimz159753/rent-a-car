import React from 'react'
import { ActionEnum, FieldType, StatusEnum } from '../interfaces/vehicle.interface'
import { Button, Form, Input, Select, Upload, UploadProps, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './form.css'

interface FormProps {
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

const props: UploadProps = {
    accept: "image/*",
    headers: { "content-type": "multipart/form-data" },
    beforeUpload: (file) => {
        const isPNG = file.type === 'image/png';
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    },
    customRequest: ({ onSuccess }: any) => onSuccess("ok"),
    maxCount: 1,
    listType: "picture"
};

export const VehicleForm = ({
    setOpen,
    model,
    brand,
    plate,
    price,
    status,
    action,
    handleAction,
    form }: FormProps) => {
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
            requiredMark={'optional'}
            form={form}
            initialValues={{
                model,
                brand,
                plate,
                price,
                status
            }}
            className='vehicles-form'
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
            {action === ActionEnum.ADD &&
                <Form.Item<FieldType>
                    label="Imagen"
                    getValueFromEvent={({ file }) => file.originFileObj}
                    name="image"
                    rules={[{ required: true, message: 'Imagen requerido.' }]}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Subir</Button>
                    </Upload>
                </Form.Item>
            }
            <div className='mt-10 flex space-x-10'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Form.Item>
                    <Button className='submit' htmlType='submit' >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
                </Form.Item>
            </div>
        </Form>
    )
}
