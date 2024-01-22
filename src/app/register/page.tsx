'use client'
import React, { useState } from 'react'
import { Container } from '../components/ui/Container'
import { FieldType, RegisterProps } from './interface/register.interface'
import { Button, Form, Steps, message } from 'antd'
import Details from '../vehicles/details/page'
import { ClientForm } from './clientFrom/clientForm'
import { PaymentForm } from './paymentForm/paymentForm'
import dayjs from 'dayjs'
import './page.css'

const Register = ({ searchParams }: RegisterProps) => {
    const [current, setCurrent] = useState(0);
    const { startDate, endDate, agency } = searchParams
    const startDateFormat = dayjs(startDate).format('DD-MM-YYYY')
    const endDateFormat = dayjs(endDate).format('DD-MM-YYYY')
    const [clientValues, setClientValues] = useState<FieldType>()
    const [form] = Form.useForm()

    const handleAction = (values: FieldType) => {
        setClientValues(values)
    }

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
            content: <ClientForm form={form} handleAction={handleAction} />,
        },
        {
            title: '3. Pago',
            content: <PaymentForm />,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const next = () => {
        if (current === 1) {
            form.validateFields()
                .then(values => {
                    // STORE VALUES WHEN FINISHING THE STEPS
                    setCurrent(current + 1);
                })
        } else {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <Container>
            <div className='register-container'>
                <Steps current={current} items={items} />
                <div className='my-32 flex justify-center'>{steps[current].content}</div>
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
