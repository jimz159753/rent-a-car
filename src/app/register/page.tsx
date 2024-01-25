'use client'
import React, { useState } from 'react'
import { Container } from '../components/ui/Container'
import { IRent, IVehicle, RegisterProps } from './interface/register.interface'
import { Button, Form, Steps } from 'antd'
import Details from '../vehicles/details/page'
import { ClientForm } from './clientFrom/clientForm'
import dayjs from 'dayjs'
import './page.css'
import { addRent } from './actions/actions'
import { useRouter } from 'next/navigation'

const Register = ({ searchParams }: RegisterProps) => {
    const [current, setCurrent] = useState(0);
    const { startDate, endDate, agency, vehicle } = searchParams
    const vehicleObj: IVehicle = JSON.parse(vehicle)
    const startDateFormat = dayjs(startDate).format('DD-MM-YYYY')
    const endDateFormat = dayjs(endDate).format('DD-MM-YYYY')
    const [form] = Form.useForm()
    const router = useRouter()

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
            content: <ClientForm form={form} />,
        }
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handlePayment = () => {
        const days = dayjs(endDate).diff(dayjs(startDate), 'days')
        const total = (days * Number(vehicleObj.price) * 100).toString()
        form.validateFields()
            .then(async (clientValues) => {
                const newRent: IRent = {
                    client: clientValues,
                    vehicle: vehicleObj,
                    days: days.toString(),
                    total: total,
                    startDate: startDateFormat,
                    endDate: endDateFormat
                }
                const response = await addRent(newRent)
                const session = await response.json()
                router.push(session.url)
            })
    }

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
                        <Button onClick={handlePayment}>
                            Pagar
                        </Button>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default Register
