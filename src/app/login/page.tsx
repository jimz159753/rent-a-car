'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Button, Input, Form } from 'antd';
import './page.css'
import { Context } from '../layout';

const Login = () => {
    const rentACarIcon = require('../../../public/rent_a_car.png')
    const { push } = useRouter();
    const [user, setUser] = useContext(Context)

    type FieldType = {
        email: string;
        password: string;
    }

    const handleClick = async (values: FieldType) => {
        const { email, password } = values
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (data.token) {
            setUser(data.user)
            localStorage.setItem('token', data.token)
            push('/dashboard/information')
        }
    }
    return (
        <div className='login-form'>
            <Form className='login-container' onFinish={handleClick}>
                <Image src={rentACarIcon} alt="rent a car" />
                <Form.Item<FieldType>
                    name="email"
                    rules={[{ required: true, message: 'Correo eléctronico requerido.' }]}
                >
                    <Input placeholder='email' />
                </Form.Item>
                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Contraseña requerido.' }]}
                >
                    <Input.Password placeholder='contraseña' />
                </Form.Item>
                <Form.Item<FieldType>>
                    <Button htmlType='submit'>Entrar</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login