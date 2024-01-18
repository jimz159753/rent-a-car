'use client'
import React from 'react'
import './page.css'
import { Button, Image, Card, Carousel } from 'antd'
import { Container } from '@/app/components/ui/Container'
import { VehicleProps } from '../interface/vehicle.interface'

const { Meta } = Card;

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Details = ({ searchParams }: VehicleProps) => {
    const vehicle = JSON.parse(searchParams.vehicle)
    return (
        <Container>
            <div className='details-container'>
                <h1>Renta un {vehicle.brand}</h1>
                <div className='flex justify-between gap-20'>
                    <Card
                        cover={<Image alt="vehicle" src={`${process.env.FILES_URL}${vehicle.image}`} preview={false} crossOrigin='anonymous' />}
                    >
                        <Meta
                            title={`${vehicle.brand} ${vehicle.model}`}
                            description={vehicle.type}
                        />
                    </Card>
                    <div className='description'>
                        Un auto sedán standard automático de excelente rendimiento para compartir el viaje e ir a donde más te guste.
                        Reserva un vehículo sedán standard automático, incluyendo el Chervrolet Onix o similar con Avis y llega a donde te propongas con su espacio para compartir y gran rendimiento de combustible. La marca y modelo de los vehículos están sujetos a disponibilidad y ubicación.
                        Marcas y modelos similares que podrías recibir: MG MG5, VW Vento o similar.
                    </div>
                </div>
                <div className='caracteristics'>
                    <h1>Caracteristícas</h1>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </div>
                <Button>RESERVAR AHORA</Button>
            </div>
        </Container >
    )
}

export default Details;