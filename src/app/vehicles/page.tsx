'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/ui/Container'
import { IVehicle, VehicleProps } from './interface/vehicle.interface'
import { getVehiclesByCategory } from './actions/actions'
import { Card, Image } from 'antd';
import './page.css'

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
            <div className='vehicle-list'>
                {data &&
                    data.map(({ _id, image, brand, model }: IVehicle) => <Card
                        key={_id}
                        title={brand}
                        cover={<Image alt="vehicle" src={`${process.env.FILES_URL}${image}`} preview={false} crossOrigin='anonymous' />}
                    >
                        <Meta title={brand} description={model} />
                    </Card>
                    )
                }
            </div>
        </Container>
    )
}

export default Vehicles