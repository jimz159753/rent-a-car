import React from 'react'
import { ActionEnum, FieldType, IClient, IVehicle } from '../interfaces/document.interface'
import './form.css'
import { Button, Form, Select, Upload, UploadProps, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface FormProps {
    setOpen: (e: boolean) => void
    client: string
    vehicle: string
    action: ActionEnum
    dropClients: IClient[];
    dropVehicles: IVehicle[];
    handleAction: (values: FieldType) => void
    form: any
}

const props: UploadProps = {
    accept: "application/pdf",
    headers: { "content-type": "multipart/form-data" },
    beforeUpload: (file) => {
        const isPNG = file.type === 'application/pdf';
        if (!isPNG) {
            message.error(`${file.name} is not a pdf file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    },
    customRequest: ({ onSuccess }: any) => onSuccess("ok"),
    maxCount: 1,
    listType: "picture"
};

export const DocumentForm = ({
    setOpen,
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
            {action === ActionEnum.ADD &&
                <Form.Item<FieldType>
                    label="Documento"
                    getValueFromEvent={({ file }) => file.originFileObj}
                    name="document"
                    rules={[{ required: true, message: 'Documento requerido.' }]}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Subir</Button>
                    </Upload>
                </Form.Item>
            }
            <div className='mt-10 flex justify-between'>
                <Button className='cancel' onClick={() => setOpen(false)} >Cancelar</Button>
                <Form.Item>
                    <Button className='submit' htmlType='submit' >{action === ActionEnum.ADD ? 'Agregar' : 'Actualizar'}</Button>
                </Form.Item>
            </div>
        </Form>
    )
}
