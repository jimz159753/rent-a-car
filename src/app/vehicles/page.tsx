'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/ui/Container'
import { CategoryEnum, IVehicle, TransmitionEnum, VehicleProps } from './interface/vehicle.interface'
import { getVehicles, getVehiclesByCategory } from './actions/actions'
import { Button, Card, Image } from 'antd';
import { FaUser, FaSuitcaseRolling, FaSuitcase, FaSnowflake, FaCarSide } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import './page.css'

const { Meta } = Card;

const Vehicles = ({ searchParams }: VehicleProps) => {
    const [data, setData] = useState<IVehicle[]>()
    const router = useRouter();

    const loadVehiclesByCategory = async (category: CategoryEnum) => {
        const vehicles = await getVehiclesByCategory(category)
        setData(vehicles)
    }

    const loadVehiclesAvailable = async (startDate: string, endDate: string) => {
        const vehicles = await getVehicles(startDate, endDate)
        setData(vehicles)
    }

    useEffect(() => {
        const { category, startDate, endDate } = searchParams
        if (category) {
            loadVehiclesByCategory(category)
        } else {
            loadVehiclesAvailable(startDate, endDate)
        }
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
                                <div className='flex gap-5'>
                                    <div className='flex items-center gap-1'>
                                        <FaUser size={16} />
                                        <p>{vehicle.people}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaSuitcaseRolling size={16} />
                                        <p>{vehicle.suitcases}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaSuitcase size={16} />
                                        <p>{vehicle.bags}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaCarSide size={20} />
                                        <p>{vehicle.transmition === TransmitionEnum.AUTOMATIC ? 'A' : 'M'}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaSnowflake size={16} />
                                        <p>{vehicle.ac}</p>
                                    </div>
                                </div>
                            } />
                            <Button onClick={() => router.push(`/vehicles/details?vehicle=${JSON.stringify(vehicle)}`)}>Reservar</Button>
                        </Card>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}

export default Vehicles