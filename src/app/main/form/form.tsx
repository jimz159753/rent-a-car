import React from 'react'
import { Button, DatePicker, Form, Input } from 'antd'
import { FaLocationDot } from "react-icons/fa6";
import { Ifields } from '../interface/main.interface'
import './form.css'

interface FormProps {
    handleAction: (values: Ifields) => void
    form: any
}

export const MainForm = ({ form, handleAction }: FormProps) => {
    return (
        <div className='main-form'>
            <Form
                requiredMark={'optional'}
                form={form}
                onFinish={handleAction}>
                <Form.Item
                    label="Lugar de renta"
                    name="agency"
                    rules={[{ required: true, message: 'Lugar requerido.' }]}
                >
                    <Input placeholder='inicio del viaje' prefix={<FaLocationDot color='#e74e4e' />} />
                </Form.Item>
                <Form.Item
                    label="Entrega"
                    name="startDate"
                    rules={[{ required: true, message: 'Entrega requerida.' }]}
                >
                    <DatePicker placeholder='confirmación' />
                </Form.Item>
                <Form.Item
                    label="Devolución"
                    name="endDate"
                    rules={[{ required: true, message: 'Devolución requerida.' }]}
                >
                    <DatePicker placeholder='confirmación' />
                </Form.Item>
                <Form.Item className='submit-item'>
                    <Button className='submit' htmlType='submit' >Buscar</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
