import React from 'react'
import { ActionEnum, FieldType } from '../interfaces/document.interface'
import { Button, Form, Select, Upload, UploadProps, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { IRent } from '../../rents/interfaces/rent.interface'
import './form.css'

interface FormProps {
    setOpen: (e: boolean) => void
    action: ActionEnum
    rent: string;
    dropRents: IRent[]
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
    action,
    rent,
    dropRents,
    handleAction,
    form
}: FormProps) => {
    return (
        <Form
            requiredMark={'optional'}
            form={form}
            initialValues={{
                rent
            }}
            className='documents-form'
            onFinish={handleAction}>
            <Form.Item<FieldType>
                label="Alquiler"
                name="rent"
                rules={[{ required: true, message: 'Alquiler requerido.' }]}
            >
                <Select placeholder='selecciona un vehículo' options={dropRents} />
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
