import React from 'react'
import './page.css'
import { Image, Card } from 'antd'
import { VehicleProps } from '../interface/vehicle.interface'

const { Meta } = Card;

const Details = ({ searchParams }: VehicleProps) => {
    const vehicle = JSON.parse(searchParams.vehicle)
    return (
        <div className='details-container'>
            <h1 className='main-title'>Renta un {vehicle.brand}</h1>
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
                <h1 className='title'>Caracteristícas</h1>
                <div className='flex gap-12'>
                    <div className='flex flex-col items-center gap-5'>
                        <h1>Número de pasajeros</h1>
                        <p>{vehicle.people}</p>
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <h1>Número de puertas</h1>
                        <p>{vehicle.doors}</p>
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <h1>Transmisión</h1>
                        <p>{vehicle.transmition}</p>
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <h1>Aire acondicionado</h1>
                        <p>{vehicle.ac ? 'A/C' : 'NO'}</p>
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <h1>Maletas grandes</h1>
                        <p>{vehicle.suitcases}</p>
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <h1>Maletas pequeñas</h1>
                        <p>{vehicle.bags}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;