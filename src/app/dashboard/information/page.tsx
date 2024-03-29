'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, Descriptions, DescriptionsProps, Form, Layout, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Ifields, UserForm } from './form/form';
import { updateUserPassword } from './actions/actions';
import { IUser } from './interfaces/user.interface';
import './page.css'

const Information = () => {
    const [userStringObj, setUserStringObj] = useState('')
    const user: IUser = userStringObj && JSON.parse(userStringObj)
    const [form] = Form.useForm()
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
            label: 'Dirección',
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

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user)
            setUserStringObj(user)
    }, [])

    const handleAction = (values: Ifields) => {
        const { password, confirmation } = values
        if (password === confirmation) {
            updateUserPassword(user._id, { password })
            message.success('Datos actualizados')
            form.resetFields()
        } else {
            message.error('Error en la comparación')
        }
    }
    return (
        <div className='information-content'>
            <Avatar size={100} icon={<UserOutlined />} />
            <Layout>
                <Descriptions title="Información de usuario" items={items} bordered />
                <UserForm form={form} handleAction={handleAction} />
            </Layout>
        </div>
    )
}

export default Information