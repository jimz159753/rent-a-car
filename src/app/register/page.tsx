'use client'
import React, { useState } from 'react'
import { Container } from '../components/ui/Container'
import { RegisterProps } from './interface/register.interface'
import { Button, Steps, message } from 'antd'
import Details from '../vehicles/details/page'
import { UserForm } from './userFrom/userForm'
import dayjs from 'dayjs'
import { PaymentForm } from './paymentForm/paymentForm'
import './page.css'

const Register = ({ searchParams }: RegisterProps) => {
    const [current, setCurrent] = useState(0);
    console.log(searchParams)
    const { startDate, endDate, agency } = searchParams
    const startDateFormat = dayjs(startDate).format('DD-MM-YYYY')
    const endDateFormat = dayjs(endDate).format('DD-MM-YYYY')

    const steps = [
        {
            title: <div className='text-center'>
                <p>1. Detalles del vehículo</p>
                <p>{agency}</p>
                <p >{startDateFormat} - {endDateFormat}</p>
            </div>,
            content: <Details searchParams={searchParams} />,
        },
        {
            title: '2. Completa el registro',
            content: <UserForm />,
        },
        {
            title: '3. Pago',
            content: <PaymentForm />,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <Container>
            <div className='register-container'>
                <Steps current={current} items={items} />
                <div className='my-32'>{steps[current].content}</div>
                <div className='flex justify-center'>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Anterior
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button onClick={() => next()}>
                            Siguiente
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default Register
