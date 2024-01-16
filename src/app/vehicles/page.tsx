'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/ui/Container'
import { IVehicle, TransmitionEnum, VehicleProps } from './interface/vehicle.interface'
import { getVehiclesByCategory } from './actions/actions'
import { Button, Card, Image } from 'antd';
import './page.css'
import { FaUser, FaSuitcaseRolling, FaSuitcase, FaSnowflake, FaCarSide } from "react-icons/fa6";

const { Meta } = Card;

const Vehicles = ({ searchParams }: VehicleProps) => {
    const [data, setData] = useState<IVehicle[]>()

    const loadVehicles = async () => {
        const { category } = searchParams
        const vehicles = await getVehiclesByCategory(category)
        setData(vehicles)
    }

    useEffect(() => {
        loadVehicles()
    }, [])
    return (
        <Container>
            <div className='flex justify-center'>


                <div className='vehicle-list'>
                    {data &&
                        data.map(({ _id, image, brand, model, type, people, suitcases, bags, transmition, ac }: IVehicle) => <Card
                            key={_id}
                            title={
                                <>
                                    <h1 className='text-2xl font-bold'>{type}</h1>
                                    <h2>{brand} {model}</h2>
                                </>
                            }
                            cover={<Image alt="vehicle" src={`${process.env.FILES_URL}${image}`} preview={false} crossOrigin='anonymous' />}
                        >
                            <Meta title={
                                <div className='flex gap-5'>
                                    <div className='flex items-center gap-1'>
                                        <FaUser size={16} />
                                        <p>{people}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaSuitcaseRolling size={16} />
                                        <p>{suitcases}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaSuitcase size={16} />
                                        <p>{bags}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaCarSide size={20} />
                                        <p>{transmition === TransmitionEnum.AUTOMATIC ? 'A' : 'M'}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <FaSnowflake size={16} />
                                        <p>{ac}</p>
                                    </div>
                                </div>
                            } />
                            <Button>Reservar</Button>
                        </Card>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}

export default Vehicles