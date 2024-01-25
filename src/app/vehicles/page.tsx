'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/ui/Container'
import { IVehicle, TransmitionEnum, VehicleProps } from './interface/vehicle.interface'
import { getVehicles } from './actions/actions'
import { Button, Card, Image } from 'antd';
import { FaUser, FaSuitcaseRolling, FaSuitcase, FaSnowflake, FaCarSide } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs'
import './page.css'

const { Meta } = Card;

const Vehicles = ({ searchParams }: VehicleProps) => {
    const [data, setData] = useState<IVehicle[]>()
    const [startDate, setStartDate] = useState<Dayjs>()
    const [agency, setAgency] = useState<string>('')
    const [endDate, setEndDate] = useState<Dayjs>()
    const router = useRouter();

    const loadVehiclesAvailable = async (startDate: string, endDate: string) => {
        const startDateObj = dayjs(startDate)
        const endDateObj = dayjs(endDate)
        const vehicles = await getVehicles(startDate, endDate)
        setData(vehicles)
        setStartDate(startDateObj)
        setEndDate(endDateObj)
    }

    useEffect(() => {
        const { startDate, endDate, agency } = searchParams
        loadVehiclesAvailable(startDate, endDate)
        setAgency(agency)

    }, [])

    return (
        <Container>
            <div className='flex justify-center'>
                <div className='vehicle-list'>
                    {data &&
                        data.map((vehicle: IVehicle) => <Card
                            key={vehicle._id}
                            title={
                                <>
                                    <h1 className='text-2xl font-bold'>{vehicle.type}</h1>
                                    <h2>{vehicle.brand} {vehicle.model}</h2>
                                </>
                            }
                            cover={<Image alt="vehicle" src={`${process.env.FILES_URL}${vehicle.image}`} preview={false} crossOrigin='anonymous' />}
                        >
                            <Meta title={
                                <div>
                                    <p className='price'>{`$${startDate && endDate && Intl.NumberFormat().format(Number(Number(vehicle.price) * endDate.diff(startDate, 'days')))}`}</p>
                                    <div className='flex gap-5'>
                                        <div className='logo'>
                                            <FaUser size={16} />
                                            <p>{vehicle.people}</p>
                                        </div>
                                        <div className='logo'>
                                            <FaSuitcaseRolling size={16} />
                                            <p>{vehicle.suitcases}</p>
                                        </div>
                                        <div className='logo'>
                                            <FaSuitcase size={16} />
                                            <p>{vehicle.bags}</p>
                                        </div>
                                        <div className='logo'>
                                            <FaCarSide size={20} />
                                            <p>{vehicle.transmition === TransmitionEnum.AUTOMATIC ? 'A' : 'M'}</p>
                                        </div>
                                        <div className='logo'>
                                            <FaSnowflake size={16} />
                                            <p>{vehicle.ac}</p>
                                        </div>
                                    </div>
                                </div>
                            } />
                            <Button onClick={() => router.push(`/register?vehicle=${JSON.stringify(vehicle)}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}&agency=${agency}`)}>Reservar</Button>
                        </Card>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}

export default Vehicles