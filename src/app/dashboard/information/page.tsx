'use client'
import React from 'react'
import { Avatar, Descriptions, DescriptionsProps, Form, Layout, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Ifields, UserForm } from './form/form';
import { updateUserPassword } from './actions/actions';
import './page.css'



const Information = () => {
    const data = localStorage.getItem('user')
    const user = JSON.parse(data as string)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nombre',
            children: user.name,
        },
        {
            key: '2',
            label: 'Correo eléctronico',
            children: user.email,
        },
        {
            key: '3',
            label: 'dirección',
            children: user.address,
        },
        {
            key: '4',
            label: 'Role',
            children: user.role,
        },
        {
            key: '5',
            label: 'Fecha de creación',
            children: user.timestamp,
        },
    ];

    const handleAction = (values: Ifields) => {
        const { password, confirmation } = values
        if (password === confirmation) {
            updateUserPassword(user._id, { password })
            messageApi.open({ type: 'loading', content: 'Cargando cambios' })
                .then(() => message.success('Finalizado'))
            form.resetFields()
        } else {
            message.error('Error en la comparación')
        }
    }
    return (
        <div className='information-content'>
            {contextHolder}
            <Avatar size={100} icon={<UserOutlined />} />
            <Layout>
                <Descriptions title="Información de usuario" items={items} bordered />
                <UserForm form={form} handleAction={handleAction} />
            </Layout>
        </div>
    )
}

export default Information